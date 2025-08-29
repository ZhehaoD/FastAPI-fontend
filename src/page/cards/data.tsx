import React, { useEffect, useState } from "react";
import Table from "./table";  // 引入通用的表格组件
import Chat from '../../Chat/Chat';
import Sidebar from "./Sidebar";

// 定义表格组件的属性
interface DataSectionProps {
    url: string; // 用于获取数据的 URL
    title: string; // 表格标题
    nameField: string; // 可选的 name 属性
    names: string; // 可选的 name 属性
}

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

const Data: React.FC<DataSectionProps> = ({ url, title, nameField, names }) => {
    const [activeTab, setActiveTab] = useState<string>("home");
    const [nameFieldValue, setNameField] = useState<string>(""); 
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedMessages, setSelectedMessages] = useState<Message[]>([]); 
    const [streamingMessages, setStreamingMessages] = useState<string[]>([]); // To hold SSE messages

    // 创建数据
    const handleRegister = async () => {
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ [nameField]: nameFieldValue }),  
        });
        if (res.ok) {
            const data = await res.json();
            alert("创建成功！");
        } else {
            const err = await res.json();
            alert("注册失败: " + err.detail);
        }
    };

    // 获取所有会话
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

    // Use SSE to listen for new messages from the server
    const startSSE = () => {
        const eventSource = new EventSource("http://localhost:8000/stream-messages");
        
        eventSource.onmessage = function(event) {
            // On receiving a new message, add it to the state
            setStreamingMessages((prevMessages) => [...prevMessages, event.data]);
        };

        eventSource.onerror = function(error) {
            console.error("Error with SSE:", error);
        };
    };

    useEffect(() => {
        fetchConversations();
        startSSE(); // Start listening to SSE when component mounts
    }, []);

    const handleConversationClick = (conversation: Conversation) => {
        const storedPower = localStorage.getItem("power");
        if (conversation.power === parseInt(storedPower || "0", 10)) {
            setSelectedMessages(conversation.messages);
        } else {
            alert("你没有权限查看这段对话");
            setSelectedMessages([]);
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
            <Sidebar onSelect={setActiveTab} />
            <div style={{ flex: 1, padding: "20px" }}>
                {activeTab === "home" && (
                    <div>
                        <h2>主页</h2>
                        <p>欢迎来到{names}管理系统！</p>
                    </div>
                )}
                {activeTab === "power" && (
                    <div>
                        <Table url={url} title={title} names={nameField} />
                    </div>
                )}
                {activeTab === "make" && (
                    <div>
                        <h2>创建数据</h2>
                        <input
                            type="text"
                            placeholder={nameField}
                            value={nameFieldValue}
                            onChange={(e) => setNameField(e.target.value)} 
                        />
                        <button onClick={handleRegister}>创建</button>
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

                        {/* If there are selected messages, display them at the bottom */}
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
};

export default Data;
