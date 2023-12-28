import React from "react";
import { Icon, Input, Button, DatePicker, Menu, Spin, Select } from "antd";
import { Link } from "react-router-dom";

export const ComponentAksi = (actions, record, rowKey) => {
  return (
    <Menu>
      {actions.length === 0 ? (
        <Spin size="small" />
      ) : (
        actions.map((item, index) => {
          if (typeof item?.checkRules !== "undefined") {
            const checkRules = item?.checkRules(record);
            if (!checkRules) return null;
          }
          return (
            <Menu.Item key={`action${index}`}>
              <Link
                onClick={(evt) => {
                  if (typeof item?.onClick !== "undefined")
                    item.onClick(record[rowKey], record);
                }}
                to={item?.to ? item.to(record[rowKey]) : {}}
                className="nav-text"
              >
                {item.title}
              </Link>
            </Menu.Item>
          );
        })
      )}
    </Menu>
  );
};
export const getColumnSearchProps = (
  title,
  dataIndex,
  applySearch,
  handleReset,
  searchInputRef,
  value
) => {
  return {
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => {
      return (
        <div style={{ padding: 8 }}>
          <Input
            ref={searchInputRef}
            placeholder={`Search ${title}`}
            value={selectedKeys[0] || value}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => applySearch(selectedKeys, confirm, dataIndex)}
            style={{ width: "100%", marginBottom: 8, display: "block" }}
          />
          <Button
            type="primary"
            onClick={() => applySearch(selectedKeys, confirm, dataIndex)}
            icon="search"
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button
            onClick={() =>
              handleReset(selectedKeys, confirm, dataIndex, clearFilters)
            }
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </div>
      );
    },
    filterIcon: (filtered) => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInputRef.current.select());
      }
    },
    render: (text) => <span>{`${text}`}</span>,
  };
};

export const getColumnSearchPropsDate = (
  title,
  dataIndex,
  applySearch,
  handleReset,
  searchInputRef,
  value
) => ({
  filterDropdown: ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
  }) => {
    return (
      <div style={{ padding: 8 }}>
        <DatePicker
          placeholder={`Pilih tanggal`}
          format={"DD-MM-YYYY"}
          defaultPickerValue={value}
          value={selectedKeys[0] ? selectedKeys[0] : value}
          onChange={(e) => {
            setSelectedKeys(e ? [e] : []);
          }}
          onPressEnter={() => applySearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => {
            if (selectedKeys[0]) {
              applySearch(selectedKeys, confirm, dataIndex);
            } else {
              confirm();
            }
          }}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() =>
            handleReset(selectedKeys, confirm, dataIndex, clearFilters)
          }
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    );
  },
  filterIcon: (filtered) => (
    <Icon
      type="search"
      style={{ color: filtered || value !== null ? "#1890ff" : undefined }}
    />
  ),
});

export const getColumnSearchSelect = (
  options,
  keyOption,
  labelOption,
  title,
  dataIndex,
  applySearch,
  handleReset,
  searchInputRef,
  value
) => {
  return {
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => {
      return (
        <div style={{ padding: 8 }}>
          <Select
            value={selectedKeys[0] || value}
            onChange={(val) => {
              setSelectedKeys(val ? [val] : []);
            }}
            placeholder={`Search ${title}`}
            style={{ width: "100%" }}
            className="mb-1"
            loading={options.loading}
            allowClear={true}
          >
            {Array.isArray(options.data) && options.data.length > 0
              ? options.data.map((itemOption, iOption) => {
                  return (
                    <Select.Option
                      key={`opt${keyOption}_${iOption}`}
                      value={itemOption[keyOption]}
                    >
                      {itemOption[labelOption]}
                    </Select.Option>
                  );
                })
              : null}
          </Select>
          <Button
            type="primary"
            onClick={() => applySearch(selectedKeys, confirm, dataIndex)}
            icon="search"
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button
            onClick={() =>
              handleReset(selectedKeys, confirm, dataIndex, clearFilters)
            }
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </div>
      );
    },
    filterIcon: (filtered) => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInputRef.current.select());
      }
    },
    render: (text) => <span>{`${text}`}</span>,
  };
};

export const convertObjectToApiParams = (val) => {
  const sortOrder =
    val?.sorter?.order === "ascend"
      ? "ASC"
      : val?.sorter?.order === "descend"
      ? "DESC"
      : "DESC";

  const sortField =
    val?.sorter?.field && sortOrder.length > 0 ? val?.sorter?.field : "";

  const sortParams =
    typeof val?.sorter === "undefined"
      ? {}
      : {
          sortField,
          sortOrder,
        };

  const parameter = {
    page: val.page,
    size: val.size,
    ...val.filter,
    ...sortParams,
  };
  return parameter;
};
