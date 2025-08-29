import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import Table from "../table"
import Chat from '../../../Chat/Chat';

interface Message {
  id: number;
  sender: string;
  content: string;
  conversation_id: number;
}

interface Conversation {
  id: number;
  power: number;
  messages: Message[];
}

function App() {
  const [activeTab, setActiveTab] = useState<string>("home"); // 默认显示主页
  const [name, setname] = useState("");
  const [oldName, setOldName] = useState("");
  const [newName, setNewName] = useState("");
  const [message, setMessage] = useState("");
  const [deleteName, setDeleteName] = useState("")
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMessages, setSelectedMessages] = useState<Message[]>([]);  // 用于保存选中的消息
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

  const handleUpdate = async () => {
    try {
      const res = await fetch("http://localhost:8000/boss/update-name", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          old_name: oldName,
          new_name: newName,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        setMessage("修改失败: ");
        return;
      }

      const data = await res.json();
      setMessage(`修改成功`);
    } catch (error) {
      console.error(error);
      setMessage("请求出错，请检查服务器是否启动");
    }
  };

  const handleDeleteByName = async () => {
    if (!deleteName) {
      alert("请输入要删除的名字");
      return;
    }
    if (!window.confirm(`确定要删除名字=${deleteName} 吗？`)) return;

    try {
      const res = await fetch(`http://localhost:8000/boss/delete-by-name?name=${deleteName}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const err = await res.json();
        alert("删除失败: " + (err.detail || "未知错误"));
        return;
      }

      alert("删除成功");
      setDeleteName(""); // 清空输入框
    } catch (error) {
      console.error(error);
      alert("请求出错，请检查服务器是否启动");
    }
  };

  const getStoredPower = (): number => {
    const storedPower = localStorage.getItem('power');
    return storedPower ? parseInt(storedPower, 10) : 0;  // 默认值为 0
  };

  const fetchConversations = async () => {
    try {
      const response = await fetch('http://localhost:8000/conversations');
      if (!response.ok) {
        throw new Error('Failed to fetch conversations');
      }
      const data: Conversation[] = await response.json();
      setConversations(data);
    } catch (error) {
      setError('Error fetching conversations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);


  const handleConversationClick = (conversation: Conversation) => {
    const storedPower = getStoredPower();
    if (conversation.power === storedPower) {  // 假设要检查的 power 是 4
      // 如果 power 匹配，保存消息并显示
      setSelectedMessages(conversation.messages);
    } else {
      // 如果 power 不匹配，弹出提示
      alert('你没有权限查看这段对话');
      setSelectedMessages([]); // 清空消息
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
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
        {activeTab === "power" && (
          <div>
            <Table url="http://localhost:8000/boss" title="Boss Management" names="name"/>
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
        {activeTab === "change" && (
          <div>
            <h2>修改数据</h2>
            <input
              type="text"
              placeholder="修改前的名字"
              value={oldName}
              onChange={(e) => setOldName(e.target.value)}
            />
            <input
              type="text"
              placeholder="修改后的名字"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <button onClick={handleUpdate}>修改</button>
            {message && <p>{message}</p>}
          </div>
        )}
        {activeTab === "delete" && (
          <div>
            <h2>根据名字删除数据</h2>
            <input
              type="text"
              placeholder="要删除的名字"
              value={deleteName}
              onChange={(e) => setDeleteName(e.target.value)}
            />
            <button onClick={handleDeleteByName}>删除</button>
          </div>
        )}
        {activeTab === "Chat" && (
          <div>
            <Chat />
          </div>
        )}

        {activeTab === "data" && (
          <div>
            <h1>Conversations</h1>
            <div>
              {conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => handleConversationClick(conversation)}
                >
                  Conversation {conversation.id}
                </button>
              ))}
            </div>

            {/* 如果有选中的消息，就在底部显示 */}
            <div>
              <div>
                <h2>Messages:</h2>
                <ul>
                  {selectedMessages.map((message) => (
                    <li key={message.id}>
                      <strong>{message.sender}:</strong> {message.content}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
