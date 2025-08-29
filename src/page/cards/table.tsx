import React, { useEffect, useState } from "react";

interface Data {
  id: number;
  [key: string]: any;
}

interface TableProps {
  url: string; // 用于获取数据的 URL
  title: string; // 表格标题
  names: string; // 可选的 name 属性
}

const Table: React.FC<TableProps> = ({ url, title, names }) => {
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);

  // 从后端获取数据
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url); // 使用传入的 URL
        if (!res.ok) throw new Error("获取数据失败");
        const data = await res.json();
        setData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]); // 依赖于 url，URL 改变时重新请求

  if (loading) {
    return <p>正在加载数据...</p>;
  }

  return (
    <div>
      <h2>{title}</h2>
      <table border={1} cellPadding={8} style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>{names}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item[names]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
