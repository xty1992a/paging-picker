import React, { useCallback, useEffect, useState } from "react";
import { render } from "react-dom";
// import pickItem from "../package/main";
import pickItem from "../../lib/paging-picker";
import "./index.less";

function App() {
  const onClick = async () => {
    const result = await pickItem({
      value: [],
      // @ts-ignore
      options: [...Array(10)].map((n, i) => ({ key: String(i), value: i })),
    });
    console.log("result", result);
  };

  return (
    <>
      <button onClick={onClick}>选择</button>
    </>
  );
}

render(<App />, document.getElementById("app"));
