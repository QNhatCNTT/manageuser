import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import { Table } from "rsuite";
import EditIcon from "@rsuite/icons/Edit";
import TrashIcon from "@rsuite/icons/Trash";
import { MyPagination } from "./Common";

const pageSize = 5;

const a = window.innerWidth - 100;

export default function UserTable() {
  const [current, setCurrent] = useState(1);
  const [width, setWidth] = useState(a);
  const { initData, isSearch, foundData, deleteUser } =
    useContext(GlobalContext);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();

  useEffect(() => {
    if (isSearch) {
      setData(foundData);
    } else {
      setData(initData);
    }
  }, [isSearch, foundData, initData]);

  const getData = (current, pageSize) => {
    if (sortColumn && sortType) {
      return data
        .sort((a, b) => {
          let x = a[sortColumn];
          let y = b[sortColumn];
          if (typeof x === "string") {
            x = x.charCodeAt();
          }
          if (typeof y === "string") {
            y = y.charCodeAt();
          }
          if (sortType === "asc") {
            return x - y;
          } else {
            return y - x;
          }
        })
        .slice((current - 1) * pageSize, current * pageSize);
    }
    return data.slice((current - 1) * pageSize, current * pageSize);
  };
  const hanldeSortColumn = (sortColumn, sortType) => {
    console.log(sortColumn, sortType);
    setSortColumn(sortColumn);
    setSortType(sortType);
  };

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth - 100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="table-data">
      <Table
        height={270}
        width={width}
        sortColumn={sortColumn}
        sortType={sortType}
        data={getData(current, pageSize)}
        onSortColumn={hanldeSortColumn}
        onRowClick={(data) => {}}
      >
        <Table.Column width={width * 0.3} sortable>
          <Table.HeaderCell>NAME</Table.HeaderCell>
          <Table.Cell dataKey="name" />
        </Table.Column>
        <Table.Column width={width * 0.3} sortable>
          <Table.HeaderCell>PHONE</Table.HeaderCell>
          <Table.Cell dataKey="phone" />
        </Table.Column>
        <Table.Column width={width * 0.3}>
          <Table.HeaderCell>BIRTHDAY</Table.HeaderCell>
          <Table.Cell dataKey="birth_day" />
        </Table.Column>
        <Table.Column width={width * 0.1} fixed="right">
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
                    margin: `0 ${(width * 0.1 - 64) / 2}px`,
                  }}
                >
                  <span
                    onClick={handleEdit}
                    style={{
                      color: "Magenta",
                      cursor: "pointer",
                      fontSize: 17,
                      marginRight: 5,
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
                      marginLeft: 5,
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
        pageSize={pageSize}
      />
    </div>
  );
}
