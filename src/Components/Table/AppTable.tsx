import React from "react";
import { Table } from "antd";
import { ColumnProps } from "antd/lib/table";

export interface DataType {
  [key: string]: any;
}

interface AppTableProps {
  dataSource: DataType[];
  columns: ColumnProps<DataType>[];
  pagination?: boolean | { defaultPageSize?: number };
  onChange?: any;
}

const AppTable: React.FC<AppTableProps> = ({
  dataSource,
  columns,
  pagination,
  onChange,
}) => {
  const tableColumns = columns.map((column) => ({
    ...column,
    onCell: () => ({
      style: {
        padding: "4px 16px",
      },
    }),
  }));

  const paginationConfig = pagination
    ? pagination === true
      ? { pageSizeOptions: ["10", "20", "50", "100"], showSizeChanger: true }
      : pagination
    : false;

  return (
    <Table
      style={{
        minHeight: 400,
      }}
      dataSource={dataSource}
      columns={tableColumns}
      pagination={paginationConfig}
      onChange={onChange}
    />
  );
};

export default AppTable;
