const Task = require('../models/TaskModel');
const KanbanColumn = require('../models/KanbanColumnModel');

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, subtitle, priority, status, comments, dueDate, completion } = req.body;
    const task = new Task({ title, subtitle, priority, status, comments, dueDate, completion });
    await task.save();
        // Convert status to proper column name format
    let columnName = status;
    if (status === 'todo') columnName = 'Todo';
    else if (status === 'inprogress') columnName = 'In Progress';
    else if (status === 'review') columnName = 'Review';
    else if (status === 'completed') columnName = 'Completed';
    else if (status === 'archive') columnName = 'Archive';
    else {
      // For custom columns, capitalize first letter and add spaces before capitals
      columnName = status.charAt(0).toUpperCase() + status.slice(1).replace(/([A-Z])/g, ' $1');
    }
    
    console.log(`Looking for column: "${columnName}"`);
    let column = await KanbanColumn.findOne({ name: columnName });
    
    if (!column) {
      console.log(`Column "${columnName}" not found, creating new column`);
      // Create column if it doesn't exist
      column = new KanbanColumn({ name: columnName, tasks: [task._id] });
      await column.save();
      console.log(`Created new column: "${columnName}"`);
    } else {
      console.log(`Found existing column: "${columnName}", adding task`);
      // Add task to existing column
      column.tasks.push(task._id);
      await column.save();
    }
        res.status(201).json(task);
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(400).json({ error: err.message });
  }
}; 