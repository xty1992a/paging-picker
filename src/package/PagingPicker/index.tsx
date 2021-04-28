import React, { DependencyList, useEffect, useState } from "react";
import {
  Modal,
  Table,
  Spin,
  Input,
  message,
  Radio,
  Checkbox,
  ConfigProvider,
} from "antd";
import type {
  PickOptions,
  Pack,
  Item,
  DataRequest,
  PagingPickerProps,
} from "../../types";
import PagingTable from "../PagingTable";
import "./index.less";
import zhCN from "antd/es/locale/zh_CN";

export default function PagingPicker<RecordType>(
  props: PagingPickerProps<RecordType>
) {
  const {
    resolve,
    title,
    width,
    request,
    searchable,
    placeholder = "请输入关键字",
  } = props;
  const [query, setQuery] = React.useState({
    pageIndex: 1,
    pageSize: 10,
    keywords: "",
  });

  const [value, setValue] = React.useState(props.value);
  const [visible, setVisible] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [list, setList] = React.useState<RecordType[]>([]);
  const [total, setTotal] = React.useState(0);
  const pickedKeys = React.useMemo(() => {
    return value.map((it: RecordType) => it[props.alias.key]);
  }, [value, props.alias]);
  const columns = React.useMemo(() => {
    return [
      {
        title: "选择",
        key: "__selection__",
        render: (text: string, record: RecordType) => {
          const checked = pickedKeys.includes(record[props.alias.key]);
          return props.radio ? (
            <Radio checked={checked} />
          ) : (
            <Checkbox checked={checked} />
          );
        },
      },
      ...props.columns,
    ];
  }, [props.columns, pickedKeys]);
  const callback = React.useRef(() => {});

  const onPickItem = (item: RecordType) => {
    const key = props.alias.key;
    const valueKeys = pickedKeys;
    if (props.radio) {
      setValue([item]);
      return;
    }
    if (valueKeys.includes(item[key])) {
      setValue(value.filter((it) => it[key] !== item[key]));
    } else {
      setValue((list) => [...list, item]);
    }
  };

  const onClose = () => {
    callback.current.apply(null);
  };

  const onOk = () => {
    if (!value.length) {
      message.warn("请选择至少一个项目");
      return;
    }
    setVisible(false);
    callback.current = () => resolve({ success: true, value });
  };

  const onCancel = () => {
    setVisible(false);
    callback.current = () => resolve({ success: false, value: props.value });
  };

  const fetch = React.useCallback(async () => {
    console.log("fetch");
    setLoading(true);
    const result = await props.request(query);
    setLoading(false);
    if (!result.success) return;
    const { list = [], total = 0 } = result.data;
    setList(list);
    setTotal(total);
  }, [query, request]);

  useEffect(() => {
    fetch();
  }, [query]);

  return (
    <ConfigProvider locale={zhCN}>
      <Modal
        title={title}
        destroyOnClose
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
        afterClose={onClose}
        okText="确定"
        cancelText="取消"
        width={width}
        wrapClassName="paging-picker"
      >
        <Spin spinning={loading}>
          {searchable && (
            <div className="paging-picker_search">
              <Input.Search
                placeholder={placeholder}
                defaultValue={query.keywords}
                enterButton="搜索"
                onSearch={(keywords: string) => {
                  setQuery({ ...query, keywords });
                }}
              />
            </div>
          )}
          <div className="paging-picker_content">
            <PagingTable
              value={query}
              onChange={(query) => setQuery(query)}
              total={total}
            >
              <Table
                size="middle"
                scroll={{ y: 300 }}
                pagination={false}
                dataSource={list}
                columns={columns}
                onRow={(record: RecordType) => {
                  return {
                    onClick: () => onPickItem(record),
                  };
                }}
              />
            </PagingTable>
          </div>
        </Spin>
      </Modal>
    </ConfigProvider>
  );
}
