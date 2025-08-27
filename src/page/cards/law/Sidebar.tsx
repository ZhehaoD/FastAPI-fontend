import React from "react";

interface SidebarProps {
  onSelect: (tab: string) => void;  // 点击菜单时回调给父组件
}

const Sidebar: React.FC<SidebarProps> = ({ onSelect }) => {
  return (
    <div
      style={{
        width: "200px",
        height: "100vh",
        background: "green",
        padding: "20px",
        boxShadow: "-2px 0 5px rgba(0,0,0,0.1)",
      }}
    >
      <h3>导航菜单</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li style={{ marginBottom: "10px" }}>
          <button style={{ width: "100%" }} onClick={() => onSelect("home")}>
            主页
          </button>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <button style={{ width: "100%" }} onClick={() => onSelect("law")}>
            数据
          </button>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <button style={{ width: "100%" }} onClick={() => onSelect("make")}>
            创建数据
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
