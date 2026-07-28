import Input from "./Input";

const SearchAndFilter = ({
  value,
  handleSearchChange,
  handlePriorityChange,
  placeholder,
  options = [],
}) => {
  return (
    <>
      <div className="flex justify-between item-center p-4">
        <div>
          <Input
            placeholder={placeholder}
            value={value}
            onChange={handleSearchChange}
          />
        </div>
        <div className="flex justify-center gap-3">
          <select
            value={value}
            name="taskPriority"
            onChange={handlePriorityChange}
            className="border border-gray-300 rounded-md p-2">
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default SearchAndFilter;
