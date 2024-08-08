import React from "react";
import { Select } from "antd";
import { useAppSelector } from "../../../Hooks/reduxHook";

interface SelectUserBarProps {
  onSelectUser: (user: any) => void;
}
const onSearch = (value: string) => {};

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
    onSelectUser(option.user);
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
