import React from "react";
import { Pagination } from "antd";
import { DataQuery } from "../../types";
import "./index.less";

interface PagingTableProps extends React.Props<any> {
  value: DataQuery;
  total: number;
  pageSizeOptions?: string[];
  onChange?: (query: DataQuery) => void;
}

export default function PagingTable(props: PagingTableProps) {
  const onChange = (pageIndex: number, pageSize: number) => {
    props.onChange &&
      props.onChange({
        ...props.value,
        pageIndex,
        pageSize,
      });
  };

  return (
    <div className="paging-table">
      <div className="paging-table_content">{props.children}</div>

      <div className="paging-table_foot">
        <Pagination
          size="small"
          showSizeChanger
          showQuickJumper
          current={props.value.pageIndex}
          pageSize={props.value.pageSize}
          pageSizeOptions={props.pageSizeOptions || ["10", "20", "30", "40"]}
          total={props.total}
          onChange={onChange}
          onShowSizeChange={onChange}
        />
      </div>
    </div>
  );
}
