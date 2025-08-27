import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        const res = await fetch("http://localhost:8000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                username,
                password,
            }),
        });

        if (res.ok) {
            const data = await res.json();
            console.log("后端返回:", data);

            // ✅ 保存 token (推荐 localStorage)
            localStorage.setItem("token", data.access_token);
            localStorage.setItem("power", data.power);

            if (data.power === 1) {
                window.location.href = "/sales";
            } else if (data.power === 2) {
                window.location.href = "/market";
            } else if (data.power ===3) {
                window.location.href = "/law";
            } else {
                window.location.href = "/Boss";
            }
        } else {
            const err = await res.json();
            alert("登录失败: " + err.detail);
        }
    };

    return (
        <div>
            <h2>登录</h2>
            <input
                type="text"
                placeholder="用户名"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>登录</button>
            <button onClick={() => { navigate('/register'); }}>注册</button>
        </div>
    );
}

export default Login;
