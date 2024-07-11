import React from "react";
import { Select } from "antd";
import { useAppSelector } from "../../../Hooks/reduxHook";

interface SelectUserBarProps {
  onSelectUser: (user: any) => void; // Define the callback function type
}
const onSearch = (value: string) => {
  console.log("search:", value);
};

// Filter `option.label` match the user type `input`
const filterOption = (
  input: string,
  option?: { label: string; value: string }
) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

const SelectUserBar: React.FC<SelectUserBarProps> = ({ onSelectUser }) => {
  const { users } = useAppSelector((state) => state.user);
  const selectOptions = users.map((user) => ({
    value: user.name,
    label: user.name,
    user: user,
  }));

  const handleChange = (value: string, option: any) => {
    onSelectUser(option.user); // Pass the entire user object to the parent component
  };
  return (
    <Select
      showSearch
      size="large"
      style={{ width: "100%" }}
      placeholder="Select User"
      optionFilterProp="children"
      onChange={handleChange}
      onSearch={onSearch}
      filterOption={filterOption}
      options={selectOptions}
    />
  );
};

export default SelectUserBar;
