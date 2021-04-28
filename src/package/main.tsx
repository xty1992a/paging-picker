import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import PagingPicker from "./PagingPicker";

import type { PickOptions, PickResult, PagingPickerProps } from "../types";

const dftOptions = {
  value: [],
  options: [],
  radio: false,
  paging: false,
  title: "标题",
  width: "600px",
  searchable: false,
  alias: {
    key: "key",
  },
};

function mergeOptions<Item>(
  lameOptions: PickOptions<Item> & { resolve: Function }
): PagingPickerProps<Item> {
  // region 合并静态options
  // 无request,但有options,实际就是静态options的配置项
  const request =
    lameOptions.request ||
    (() =>
      Promise.resolve({
        success: true,
        data: {
          list: lameOptions.options || [],
          total: lameOptions.options?.length ?? 0,
        },
      }));
  // endregion

  const result: PagingPickerProps<Item> = {
    ...dftOptions,
    ...lameOptions,
    alias: {
      ...(dftOptions.alias as { key: keyof Item }),
      ...(lameOptions?.alias ?? {}),
    },
    request,
  };

  return {
    ...result,
    request,
  };
}

export default function pickItem<Item>(
  options: PickOptions<Item>
): Promise<PickResult<Item>> {
  return new Promise((resolve) => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    const _resolve = (result: PickResult<Item>) => {
      unmountComponentAtNode(div);
      resolve(result);
    };
    const mergedOptions = mergeOptions<Item>({ ...options, resolve: _resolve });
    render(<PagingPicker {...mergedOptions} />, div);
  });
}
