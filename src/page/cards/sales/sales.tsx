import React, { useState } from "react";
import Data from "../data";  // 引入通用的数据组件

function Sales() {
  return (
      <div>
        <Data url="http://localhost:8000/sales" title="sales Management" nameField="money" names="销售"/>
      </div>
  );
}

export default Sales;
