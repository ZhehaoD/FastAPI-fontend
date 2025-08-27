import React, { useEffect, useState } from "react";

// 定义数据类型（和后端 schemas.Market 一致）
interface Market {
  id: number;
  product: number;
}

const MarketTable: React.FC = () => {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);

  // 从后端获取数据
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8000/market"); // ✅ FastAPI GET 接口
        if (!res.ok) throw new Error("获取数据失败");
        const data = await res.json();
        setMarkets(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>正在加载数据...</p>;
  }

  return (
    <div>
      <h2>Market 表数据</h2>
      <table border={1} cellPadding={8} style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>产品 (product)</th>
          </tr>
        </thead>
        <tbody>
          {markets.map((m) => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.product}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarketTable;
