import React, { useEffect, useState } from "react";

// 定义数据类型（和后端 schemas.Boss 一致）
interface Boss {
  id: number;
  name: number;  // 你可以根据实际字段改成 money 或其他
}

const BossTable: React.FC = () => {
  const [bosses, setBosses] = useState<Boss[]>([]);
  const [loading, setLoading] = useState(true);

  // 从后端获取数据
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8000/boss"); // ✅ FastAPI GET 接口
        if (!res.ok) throw new Error("获取数据失败");
        const data = await res.json();
        setBosses(data);
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
      <h2>Boss 表数据</h2>
      <table border={1} cellPadding={8} style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>名字 (name)</th>
          </tr>
        </thead>
        <tbody>
          {bosses.map((b) => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BossTable;
