import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import PagingPicker from "./PagingPicker";

import type { PickOptions, Pack, Item, PickResult } from "../types";

const dftOptions: PickOptions = {
  value: [],
  options: [],
  radio: false,
  paging: false,
  alias: {
    key: "key",
    title: "title",
  },
};

function mergeOptions(lameOptions: Pack = {}) {
  const result = {
    ...dftOptions,
    ...lameOptions,
    alias: {
      ...dftOptions.alias,
      ...(lameOptions?.alias ?? {}),
    },
  };

  // 无request,但有options,实际就是静态options的配置项
  if (!result.request && result.options) {
    result.request = () => result.options;
  }

  return result;
}

export default function pickItem(options: PickOptions) {
  const { value } = mergeOptions(options);

  return new Promise((resolve) => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    const _resolve = (result: PickResult) => {
      unmountComponentAtNode(div);
      resolve(result);
    };
    console.log("插入元素");
    render(<PagingPicker resolve={_resolve} value={value} />, div);
  });
}
