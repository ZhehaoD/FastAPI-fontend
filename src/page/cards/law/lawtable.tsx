import React, { useEffect, useState } from "react";

// 定义数据类型（和后端 schemas.Law 一致）
interface Law {
  id: number;
  company: string;
}

const LawTable: React.FC = () => {
  const [laws, setLaws] = useState<Law[]>([]);
  const [loading, setLoading] = useState(true);

  // 从后端获取数据
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8000/law"); // ✅ FastAPI GET 接口
        if (!res.ok) throw new Error("获取数据失败");
        const data = await res.json();
        setLaws(data);
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
      <h2>法律表数据</h2>
      <table border={1} cellPadding={8} style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>公司 (Company)</th>
          </tr>
        </thead>
        <tbody>
          {laws.map((law) => (
            <tr key={law.id}>
              <td>{law.id}</td>
              <td>{law.company}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LawTable;
