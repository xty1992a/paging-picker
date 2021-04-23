import React from "react";
import type {PickOptions, Pack, Item} from '../../types'

interface PagingPickerProps extends React.Props<any>, PickOptions {
  resolve: Function
}

export default function PagingPicker(props: PagingPickerProps) {
  return (
    <div>paging picker</div>
  )
}
