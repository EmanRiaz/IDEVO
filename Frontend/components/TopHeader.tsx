import { Search, Bell, Mail } from "lucide-react";
export default function TopHeader() {
  return (
    <div className="w-full flex items-center justify-between py-4 pr-8 pl-8 relative mb-6" style={{ background: "white", borderBottom: "1px solid #CCCCCC" }}>
      {/* Left: Website Design */}
      <div
        className="text-gray-900"
        style={{
          fontFamily: 'Roboto, sans-serif',
          fontWeight: 700,
          fontStyle: 'bold',
          fontSize: 32,
          lineHeight: '110%',
          letterSpacing: 0,
        }}
      >
        Website Design
      </div>
      {/* Right: Search and Icons */}
      <div className="flex items-center gap-[24px]">
        {/* Search Bar */}
        <div
          className="flex items-center bg-[#F5F7FA] px-4"
          style={{ width: 234, height: 49, borderRadius: 24.5, opacity: 1 }}
        >
          <Search className="w-6 h-6 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none text-gray-400 w-full placeholder-gray-300"
            style={{
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: 16,
              lineHeight: '140%',
              letterSpacing: 0,
            }}
          />
        </div>
        {/* Both icons in a single rectangle */}
        <div
          className="flex items-center justify-center bg-[#F5F7FA]"
          style={{ width: 94, height: 49, borderRadius: 24.5, opacity: 1 }}
        >
          <div className="relative flex items-center justify-center">
            <Bell className="w-7 h-7 text-black" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-full border-2 border-white"></span>
          </div>
          <Mail className="w-7 h-7 text-black ml-3" />
        </div>
      </div>
    </div>
  );
} 