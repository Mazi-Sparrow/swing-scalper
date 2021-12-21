import * as React from "react";
import Button from "@mui/material/Button";
import './style.css';

export const MyCommandCell = (props) => {
  const { dataItem } = props;
  const inEdit = dataItem[props.editField];
  const isNewItem = dataItem.id === undefined;

  if (props.dataItem.tradeStatus === 'Closed') {
    return (
      <td className="k-command-cell">
        <Button
          className="k-primary k-button k-grid-delete-command"
          onClick={() => (props.delete(dataItem))}
        >
          Delete
        </Button>
      </td>
    )
  }

  return inEdit ? (
    <td className="k-command-cell">
      <Button
        // color="primary"
        className="k-button k-grid-save-command"
        onClick={() => (isNewItem ? props.add(dataItem) : props.update(dataItem))}
      >
        {isNewItem ? "Add" : "Update"}
      </Button>
      <Button
        // color="secondary"
        className="k-button k-grid-cancel-command"
        onClick={() => (isNewItem ? props.discard(dataItem) : props.cancel(dataItem))}
      >
        {isNewItem ? "Discard" : "Cancel"}
      </Button>
    </td>
  ) : (
    <td className="k-command-cell">
      <Button
        className="k-primary k-button k-grid-edit-command"
        onClick={() => props.edit(dataItem)}
      >
        Edit
      </Button>
    </td>
  );
};
