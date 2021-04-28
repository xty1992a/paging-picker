import React, { useCallback, useEffect, useState } from "react";
import { Button } from "antd";
import { render } from "react-dom";
import "antd/dist/antd.css";
import pickItem from "../package/main";
import type { DataQuery } from "../types";
import "./index.less";
// import pickItem from "../../lib/paging-picker";

const sleep = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

type Item = {
  key: string;
  value: string;
};

const list: Item[] = [...Array(123)].map((n, i) => ({
  key: i + "",
  value: "item-" + i,
}));

const request = async ({ pageIndex, pageSize, keywords }: DataQuery) => {
  await sleep(300);

  const result = list.filter((i) => i.value.includes(keywords));

  return {
    success: true,
    data: {
      list: result.slice((pageIndex - 1) * pageSize, pageIndex * pageSize),
      total: result.length,
    },
  };
};

const columns = [
  {
    title: "索引",
    dataIndex: "key",
  },
  {
    title: "项目",
    dataIndex: "value",
  },
];

function App() {
  const [list, setList] = useState<Item[]>([]);

  const onClick = async () => {
    const result = await pickItem<Item>({
      value: list,
      request,
      columns,
      searchable: true,
      radio: true,
    });
    console.log("result", result);
    if (!result.success) return;
    setList(result.value);
  };

  useEffect(() => {
    onClick();
  }, []);

  return (
    <>
      <Button type="primary" onClick={onClick}>
        选择
      </Button>
      {list.map((it) => (
        <p key={it.key}>{it.value}</p>
      ))}
    </>
  );
}

render(<App />, document.getElementById("app"));
