import * as React from 'react';
import { DropDownList } from '@progress/kendo-react-dropdowns';
export const DropDownCell = props => {
  const localizedData = [{
    text: 'Open',
    value: true
  }, {
    text: 'Closed',
    value: false

  }];

  const handleChange = e => {
    if (props.onChange) {
      props.onChange({
        dataIndex: 0,
        dataItem: props.dataItem,
        field: props.field,
        syntheticEvent: e.syntheticEvent,
        value: e.target.value.value
      });
    }
  };

  const {
    dataItem
  } = props;
  const field = props.field || '';
  const dataValue = dataItem[field] === "" ? '' : dataItem[field];
  return <td>
        {dataItem.inEdit ? <DropDownList style={{
      width: "100%"
    }} onChange={handleChange} value={localizedData.find(c => c.value === dataValue)} data={localizedData} textField="text" /> : dataValue.toString()}
      </td>;
};