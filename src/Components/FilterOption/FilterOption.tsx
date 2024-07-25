import React, { ReactNode } from "react";
import { Dropdown, Space } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { theme as customTheme } from "../../Theme/theme";

const FilterOption: React.FC<any> = ({
  selectedCategory,
  options,
  onChangeFilter,
}) => {
  const items = options.map(
    (
      filter: {
        type:
          | string
          | number
          | boolean
          | React.ReactElement<any, string | React.JSXElementConstructor<any>>
          | Iterable<React.ReactNode>
          | React.ReactPortal
          | null
          | undefined;
      },
      index: { toString: () => any }
    ) => ({
      label: (
        <Space>
          {/* {filter.icon} */}
          {filter.type}
        </Space>
      ),
      key: index.toString(),
      onClick: () => onChangeFilter(filter.type),
    })
  );

  //   const handleCategoryChange = (value: string) => {
  //     setSelectedCategory(value);
  //     onChangeFilter()
  //   };
  return (
    <div
      style={{
        borderWidth: 1,
        borderColor: customTheme.palette.secondary.main,
        padding: 4,
        borderRadius: 8,
        borderStyle: "solid",
        marginRight: 12,
      }}
    >
      <Dropdown
        overlayStyle={{ color: customTheme.palette.secondary.main }}
        menu={{ items }}
        trigger={["click"]}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space
            style={{
              color: customTheme.palette.secondary.main,
              fontSize: "18px",
            }}
          >
            {selectedCategory ?? "All"}
          </Space>
          <FilterOutlined
            style={{
              fontSize: "20px",
              color: customTheme.palette.secondary.main,
              padding: "4px 4px",
              marginRight: "5px",
            }}
          />
        </a>
      </Dropdown>
    </div>
  );
};

export default FilterOption;
