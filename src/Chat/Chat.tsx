import React, { useState, useEffect } from 'react';

// 消息类型定义
interface Message {
  sender: string;
  content: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);  // 使用 Message 类型
  const [input, setInput] = useState<string>('');  // 输入的消息
  const [isFirstMessage, setIsFirstMessage] = useState<boolean>(true);  // 标记是否是第一次消息
  const [conversationId, setConversationId] = useState<number | null>(null); // 保存 conversationId

  // 发送用户消息
  const handleSendMessage = async () => {

    // 如果是第一次消息，先创建 Conversation
    if (isFirstMessage) {
      await createConversation();  // 创建 conversation 并获取 id
      setIsFirstMessage(false);  // 之后不再上传 power
    }
    if (input.trim()) {
      // 等待 conversationId 被设置好后，再发送用户消息
      if (conversationId) {
        // 先添加用户消息到聊天列表
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'User', content: input },
        ]);
        setInput('');  // 清空输入框

        // 发送 User 消息到数据库
        await fetch('http://localhost:8000/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sender: 'User',
            content: input,
            conversation_id: conversationId, // 使用 conversationId 上传
          }),
        });

        // 向后端请求模型的回复
        const response = await fetch('http://localhost:8000/Receiver', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: input }),  // 发送用户的消息
        });

        if (response.ok) {
          const data = await response.json();
          const receiverMessage = { sender: 'Receiver', content: data.response };

          // 发送 Receiver 消息到后端数据库
          const saveMessageResponse = await fetch('http://localhost:8000/messages', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              sender: receiverMessage.sender,
              content: receiverMessage.content,
              conversation_id: conversationId, // 使用 conversationId 上传
            }),
          });

          if (saveMessageResponse.ok) {
            const savedMessage = await saveMessageResponse.json();
            setMessages((prevMessages) => [
              ...prevMessages,
              { sender: savedMessage.sender, content: savedMessage.content },
            ]);
          } else {
            console.error('Failed to save receiver message to database');
          }
        } else {
          console.error('Failed to get response from backend');
        }
      }
    }
  };

  // 创建 Conversation 并获取 conversationId
  const createConversation = async () => {
    const power = localStorage.getItem("power");
    const response = await fetch("http://localhost:8000/conversations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ power }),
    });

    if (response.ok) {
      const data = await response.json();
      setConversationId(data.id);  // 保存返回的 Conversation ID
    } else {
      console.error('Failed to create conversation');
    }
  };

  return (
    <div
      className="chat-wrapper"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f4f4f4',
      }}
    >
      <div
        className="chat-container"
        style={{
          width: '400px',
          height: '700px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '20px',
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div>
          {messages.map((msg, index) => (
            <p key={index}>
              <strong>{msg.sender}: </strong>
              <span>{msg.content}</span>
            </p>
          ))}
        </div>

        {/* 输入框和发送按钮 */}
        <div
          className="input-section"
          style={{ display: 'flex', marginTop: 'auto' }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}  // 更新输入框内容
            placeholder="Type a message..."
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ddd',
            }}
          />
          <button
            onClick={handleSendMessage}  // 触发发送消息
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              padding: '10px',
              marginLeft: '10px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
