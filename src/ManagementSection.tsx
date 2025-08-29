import React, { useState } from "react";

// 定义组件接收的属性
interface ManagementSectionProps {
  title: string; // 组件标题
  onRegister: () => void; // 创建数据时的行为
  onUpdate: () => void; // 更新数据时的行为
  onDelete: () => void; // 删除数据时的行为
  registerInput: string; // 创建时的输入值
  setRegisterInput: React.Dispatch<React.SetStateAction<string>>; // 创建时输入框的更新函数
  updateInput: { oldName: string; newName: string }; // 更新时的输入值
  setUpdateInput: React.Dispatch<React.SetStateAction<{ oldName: string; newName: string }>>; // 更新时输入框的更新函数
  deleteInput: string; // 删除时的输入值
  setDeleteInput: React.Dispatch<React.SetStateAction<string>>; // 删除时输入框的更新函数
}

const ManagementSection: React.FC<ManagementSectionProps> = ({
  title,
  onRegister,
  onUpdate,
  onDelete,
  registerInput,
  setRegisterInput,
  updateInput,
  setUpdateInput,
  deleteInput,
  setDeleteInput,
}) => {
  return (
    <div>
      <h2>{title}</h2>

      {/* 创建数据 */}
      {title === "Create" && (
        <>
          <input
            type="text"
            placeholder="Enter name"
            value={registerInput}
            onChange={(e) => setRegisterInput(e.target.value)}
          />
          <button onClick={onRegister}>Create</button>
        </>
      )}

      {/* 更新数据 */}
      {title === "Update" && (
        <>
          <input
            type="text"
            placeholder="Old name"
            value={updateInput.oldName}
            onChange={(e) => setUpdateInput({ ...updateInput, oldName: e.target.value })}
          />
          <input
            type="text"
            placeholder="New name"
            value={updateInput.newName}
            onChange={(e) => setUpdateInput({ ...updateInput, newName: e.target.value })}
          />
          <button onClick={onUpdate}>Update</button>
        </>
      )}

      {/* 删除数据 */}
      {title === "Delete" && (
        <>
          <input
            type="text"
            placeholder="Enter name to delete"
            value={deleteInput}
            onChange={(e) => setDeleteInput(e.target.value)}
          />
          <button onClick={onDelete}>Delete</button>
        </>
      )}
    </div>
  );
};

export default ManagementSection;
