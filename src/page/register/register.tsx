import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";


function Register() {
    const [account, setAccount] = useState("");
    const [password, setPassword] = useState("");
    const [power, setPower] = useState("");

    const handleRegister = async () => {
        const res = await fetch("http://localhost:8000/user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ account, password, power }),
        });
        console.log(res.body);
        if (res.ok) {
            const data = await res.json();
            alert("注册成功！用户ID: " + data.account);
            window.location.href = "/";
        } else {
            const err = await res.json();
            alert("注册失败: " + err.detail);
        }
    };
    const navigate = useNavigate();
    return (
        <div>
            <h2>注册</h2>
            <input
                type="text"
                placeholder="用户名"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
            />
            <input
                type="password"
                placeholder="密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}

            />
            <input
                type="text"
                placeholder="序号"
                value={power}
                onChange={(e) => setPower(e.target.value)}
            />
            <button onClick={handleRegister}>注册</button>
            <button onClick={() => { navigate('/'); }}>返回登录</button>
        </div>
    );
};


export default Register;
