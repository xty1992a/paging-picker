import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import PagingPicker from "./PagingPicker";

import type {
  PickOptions,
  Pack,
  Item,
  PickResult,
  PagingPickerProps,
} from "../types";

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
    title: "title",
  },
};

function mergeOptions<T>(
  lameOptions: PickOptions<T> & { resolve: Function }
): PagingPickerProps<T> {
  const result = {
    ...dftOptions,
    ...lameOptions,
    alias: {
      ...dftOptions.alias,
      ...(lameOptions?.alias ?? {}),
    },
  };

  // 无request,但有options,实际就是静态options的配置项
  const request =
    result.request ||
    (() =>
      Promise.resolve({
        success: true,
        data: {
          list: result.options || [],
          total: result.options?.length ?? 0,
        },
      }));

  // @ts-ignore
  return {
    ...result,
    request,
  };
}

export default function pickItem<T>(
  options: PickOptions<T>
): Promise<PickResult<T>> {
  return new Promise((resolve) => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    const _resolve = (result: PickResult<T>) => {
      unmountComponentAtNode(div);
      resolve(result);
    };
    const mergedOptions = mergeOptions<T>({ ...options, resolve: _resolve });
    render(<PagingPicker {...mergedOptions} />, div);
  });
}
