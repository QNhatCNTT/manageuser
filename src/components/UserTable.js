import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import { Table, Pagination } from "rsuite";
import EditIcon from "@rsuite/icons/Edit";
import TrashIcon from "@rsuite/icons/Trash";

const pageSize = 5;

const MyPagination = ({ total, onChange, current }) => {
  return (
    <Pagination
      onChangePage={onChange}
      activePage={current}
      total={total}
      limit={pageSize}
      style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
    />
  );
};

const a = window.innerWidth - 100;

export default function UserTable() {
  const [current, setCurrent] = useState(1);
  const [width, setWidth] = useState(a);
  const { initData, isSearch, foundData, deleteUser } =
    useContext(GlobalContext);
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (isSearch) {
      setData(foundData);
    } else {
      setData(initData);
    }
  }, [isSearch, foundData, initData]);

  const getData = (current, pageSize) => {
    return data.slice((current - 1) * pageSize, current * pageSize);
  };

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);
  return (
    <div className="table-data">
      <Table
        height={270}
        width={width}
        data={getData(current, pageSize)}
        onRowClick={(data) => {}}
      >
        <Table.Column width={width * 0.3}>
          <Table.HeaderCell>NAME</Table.HeaderCell>
          <Table.Cell dataKey="name" />
        </Table.Column>
        <Table.Column width={width * 0.3}>
          <Table.HeaderCell>PHONE</Table.HeaderCell>
          <Table.Cell dataKey="phone" />
        </Table.Column>
        <Table.Column width={width * 0.3}>
          <Table.HeaderCell>BIRTHDAY</Table.HeaderCell>
          <Table.Cell dataKey="birth_day" />
        </Table.Column>
        <Table.Column width={width * 0.1}>
          <Table.HeaderCell
            style={{ display: "flex", justifyContent: "center" }}
          >
            ACTIONS
          </Table.HeaderCell>
          <Table.Cell style={{ boxSizing: "border-box" }}>
            {(rowData) => {
              const handleEdit = () => {
                navigate(`/users/${rowData._id}`, { state: { data: rowData } });
              };

              const handleDelete = () => {
                deleteUser(rowData._id);
              };
              return (
                <span
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <span
                    onClick={handleEdit}
                    style={{
                      color: "Magenta",
                      cursor: "pointer",
                      fontSize: 17,
                    }}
                  >
                    {" "}
                    <EditIcon />{" "}
                  </span>
                  <span
                    onClick={handleDelete}
                    style={{
                      color: "SaddleBrown",
                      cursor: "pointer",
                      fontSize: 17,
                    }}
                  >
                    {" "}
                    <TrashIcon />{" "}
                  </span>
                </span>
              );
            }}
          </Table.Cell>
        </Table.Column>
      </Table>

      <MyPagination
        onChange={setCurrent}
        total={initData.length}
        current={current}
      />
    </div>
  );
}
