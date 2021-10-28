import { DatePicker } from "@progress/kendo-react-dateinputs";

export const DateRangeFilter = (props) => {
  return (
    <div className="k-filtercell">
      <DatePicker
        value={props.min}
        onChange={(e) => {
          props.onDateFilterChange({
            value: e.target.value,
            operator: "gt",
          });
        }}
      />
      <DatePicker
        value={props.max}
        onChange={(e) => {
          props.onDateFilterChange({
            value: e.target.value,
            operator: "lt",
          });
        }}
      />
      <button
        className="k-button k-button-icon k-clear-button-visible"
        title="Clear"
        disabled={!(props.min || props.max)}
        onClick={() => props.onDateFilterClear()}
      >
        <span className="k-icon k-i-filter-clear" />
      </button>
    </div>
  );
};
