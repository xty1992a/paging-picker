import React from "react";
import { Modal } from "antd";
import type { PickOptions, Pack, Item } from "../../types";

interface PagingPickerProps extends React.Props<any>, PickOptions {
  resolve: Function;
}

export default function PagingPicker(props: PagingPickerProps) {
  const { resolve } = props;

  const onOk = () => {
    resolve({ success: true, data: null });
  };

  const onCancel = () => {
    resolve({ success: false, data: null });
  };

  return (
    <Modal visible={true} onOk={onOk} onCancel={onCancel}>
      <div>paging picker</div>
    </Modal>
  );
}
