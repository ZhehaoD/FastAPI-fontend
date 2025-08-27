import React, { useState } from "react";
import Sidebar from "./Sidebar";
import LawTable from "./lawtable";  // ✅ 引入 BossTable

function App() {
  const [activeTab, setActiveTab] = useState<string>("home"); // 默认显示主页
  const [company, setcompany] = useState("");
  const handleRegister = async () => {
    const res = await fetch("http://localhost:8000/law", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ company }),
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
            <p>欢迎来到律师管理系统！</p>
          </div>
        )}
        {activeTab === "law" && (
          <div>
            <LawTable />
          </div>
        )}
        {activeTab === "make" && (
          <div>
            <h2>创建数据</h2>
            <input
              type="text"
              placeholder="公司名"
              value={company}
              onChange={(e) => setcompany(e.target.value)}
            />
            <button onClick={handleRegister}>创建</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
