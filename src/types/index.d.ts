import { ColumnProps } from "antd/lib/table";
import React from "react";

export type Pack = {
  [prop: string]: any;
};

export type Item = {
  key: string;
  [prop: string]: any;
};

export type DataQuery = {
  pageIndex: number;
  pageSize: number;
  keywords: string;
  [key: string]: any;
};

export interface DataResult<T> {
  success: boolean;
  data: {
    list: T[];
    total: number;
  };
}

export interface DataRequest<T> {
  (query: DataQuery): Promise<DataResult<T>>;
}

export interface PickOptions<T> {
  value: T[];
  columns: ColumnProps<T>[];
  title?: string;
  width?: string | number;
  options?: T[];
  radio?: boolean;
  paging?: boolean;
  searchable?: boolean;
  request?: DataRequest<T>;
  alias?: {
    key: Partial<T>;
    title: Partial<T>;
  };
}

export interface PagingPickerProps<T> extends React.Props<any> {
  value: T[];
  title: string;
  width: string | number;
  radio: boolean;
  paging: boolean;
  searchable: boolean;
  request: DataRequest<T>;
  resolve: Function;
  columns: ColumnProps<T>[];
  alias: {
    key: string;
    title: string;
  };
  placeholder?: string;
}

export interface PickResult<T> {
  success: boolean;
  value: T[];
}
