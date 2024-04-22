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
}

const AppTable: React.FC<AppTableProps> = ({
  dataSource,
  columns,
  pagination,
}) => {
  console.log("Pagination prop:", pagination);

  const tableColumns = columns.map((column, index) => ({
    ...column,
  }));

  console.log("Table columns:", tableColumns);

  const paginationConfig = pagination
    ? pagination === true
      ? { pageSizeOptions: ["10", "20", "50", "100"], showSizeChanger: true }
      : pagination
    : false;

  console.log("Pagination config:", paginationConfig);

  return (
    <Table
      style={{
        minHeight: 600,
      }}
      dataSource={dataSource}
      columns={tableColumns}
      pagination={paginationConfig}
    />
  );
};

export default AppTable;
