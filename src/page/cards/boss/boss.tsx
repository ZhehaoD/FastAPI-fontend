import React, { useState } from "react";
import Sidebar from "./Sidebar";
import BossTable from "./bosstable";  // ✅ 引入 BossTable

function App() {
  const [activeTab, setActiveTab] = useState<string>("home"); // 默认显示主页
  const [name, setname] = useState("");
  const handleRegister = async () => {
    const res = await fetch("http://localhost:8000/boss", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    console.log(res.body);
    if (res.ok) {
      const data = await res.json();
      alert("创建成功！");
    } else {
      const err = await res.json();
      alert("注册失败: " + err.detail);
    }
  };
  return (
    <div style={{ display: "flex" }}>
      {/* 左边侧边栏 */}
      <Sidebar onSelect={setActiveTab} />

      {/* 右边内容区 */}
      <div style={{ flex: 1, padding: "20px" }}>
        {activeTab === "home" && (
          <div>
            <h2>主页</h2>
            <p>欢迎来到Boss管理系统！</p>
          </div>
        )}
        {activeTab === "Boss" && (
          <div>
            <BossTable />
          </div>
        )}
        {activeTab === "make" && (
          <div>
            <h2>创建数据</h2>
            <input
              type="text"
              placeholder="老板名字"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
            <button onClick={handleRegister}>创建</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
