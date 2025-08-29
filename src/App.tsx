import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// 导入页面组件
import Login from './page/login/login';
import Register from './page/register/register';
import Boss from './page/cards/boss/boss';
import Law from './page/cards/law/law';
import Market from './page/cards/market/market';
import Sales from './page/cards/sales/sales';

const App: React.FC = () => {
  return (
    <Router>
      {/* 定义路由 */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/boss" element={<Boss />} />
        <Route path="/law" element={<Law />} />
        <Route path="/market" element={<Market />} />
        <Route path="/sales" element={<Sales />} />



      </Routes>
    </Router>
  );
};

export default App;
