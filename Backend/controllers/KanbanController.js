const KanbanColumn = require('../models/KanbanColumnModel');

// Initialize default columns if they don't exist
const initializeDefaultColumns = async () => {
  const defaultColumns = ['Todo', 'In Progress', 'Review', 'Completed', 'Archive'];
  
  for (const columnName of defaultColumns) {
    const existingColumn = await KanbanColumn.findOne({ name: columnName });
    if (!existingColumn) {
      const column = new KanbanColumn({ name: columnName, tasks: [] });
      await column.save();
      console.log(`Created default column: ${columnName}`);
    }
  }
};

exports.getAllColumns = async (req, res) => {
  try {
    // Initialize default columns
    await initializeDefaultColumns();
    
    const columns = await KanbanColumn.find().populate('tasks');
    res.json(columns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createColumn = async (req, res) => {
  try {
    const { name } = req.body;
    const column = new KanbanColumn({ name });
    await column.save();
    res.status(201).json(column);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}; 