import React, { useEffect, useState } from "react";

// 定义数据类型（和后端 schemas.Sales 一致）
interface Sales {
  id: number;
  money: number;
}

const SalesTable: React.FC = () => {
  const [sales, setSales] = useState<Sales[]>([]);
  const [loading, setLoading] = useState(true);

  // 从后端获取数据
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8000/sales"); // ✅ FastAPI GET 接口
        if (!res.ok) throw new Error("获取数据失败");
        const data = await res.json();
        setSales(data);
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
      <h2>销售表数据</h2>
      <table border={1} cellPadding={8} style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>金额 (Money)</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.money}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesTable;
