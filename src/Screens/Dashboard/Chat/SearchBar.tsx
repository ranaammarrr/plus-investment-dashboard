import React from "react";
import { AudioOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
import type { SearchProps } from "antd/es/input/Search";
const { Search } = Input;
// const suffix = (
//   <AudioOutlined
//     style={{
//       fontSize: 16,
//       color: "#1677FF",
//     }}
//   />
// );

const SearchBar: React.FC<{ onSearch: (value: string) => void }> = ({
  onSearch,
}) => (
  <Search
    placeholder="search contact"
    onSearch={onSearch}
    // onChange={(text)=>onSearch(text)}
    
  />
);
export default SearchBar;
