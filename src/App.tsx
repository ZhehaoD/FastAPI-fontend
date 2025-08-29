import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// 导入页面组件
import Chat from './Chat/Chat';
import Login from './page/login/login';
import Register from './page/register/register';
import Boss from './page/cards/boss/boss';
import Bosstable from './page/cards/boss/bosstable';
import Law from './page/cards/law/law';
import Lawtable from './page/cards/law/lawtable';
import Market from './page/cards/market/market';
import Markettable from './page/cards/market/markettable';
import Sales from './page/cards/sales/sales';
import Salestable from './page/cards/sales/salestable';

const App: React.FC = () => {
  return (
    <Router>
      {/* 定义路由 */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/boss" element={<Boss />} />
        <Route path="/boss/table" element={<Bosstable />} />
        <Route path="/law" element={<Law />} />
        <Route path="/law/table" element={<Lawtable />} />
        <Route path="/market" element={<Market />} />
        <Route path="/market/table" element={<Markettable />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/sales/table" element={<Salestable />} />


      </Routes>
    </Router>
  );
};

export default App;
