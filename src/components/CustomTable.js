import React, { useEffect, useState, useContext } from 'react'
import { Table, Pagination } from 'rsuite'
import { useNavigate } from 'react-router-dom'
import EditIcon from '@rsuite/icons/Edit';
import TrashIcon from '@rsuite/icons/Trash';
import { GlobalContext } from '../context/GlobalState'

// const mockData = [
//   {
//     id: 1,
//     name: 'Van Hai Pham',
//     birthday: '2022-03-17',
//     phone: '0964782553',
//   },
//   {
//     id: 2,
//     name: 'Van A Nguyen', 
//     birthday: '2022-03-16',
//     phone: '0964782553',
//   },
//   {
//     id: 3,
//     name: 'Thanh D Tran',
//     birthday: '2022-01-17',
//     phone: '0964782553',
//   },
//   {
//     id: 4,
//     name: 'Thi E Nguyen',
//     birthday: '2021-01-17',
//     phone: '0964782553',
//   },
//   {
//     id: 5,
//     name: 'Tan B Bui',
//     birthday: '2002-03-17',
//     phone: '0964782553',
//   },
//   {
//     id: 6,
//     name: 'Tan B Bui',
//     birthday: '2012-03-17',
//     phone: '0964782553',
//   },
//   {
//     id: 7,
//     name: 'Tan B Bui',
//     birthday: '2020-03-17',
//     phone: '0964782553',
//   },
//   {
//     id: 8,
//     name: 'Tan B Bui',
//     birthday: '2021-01-17',
//     phone: '0964782553',
//   },
//   {
//     id: 9,
//     name: 'Tan B Bui',
//     birthday: '2000-03-11',
//     phone: '0964782553',
//   },
//   {
//     id: 10,
//     name: 'Tan B Bui',
//     birthday: '2020-09-17',
//     phone: '0964782553',
//   },
//   {
//     id: 11,
//     name: 'Tan B Bui',
//     birthday: '2012-04-17',
//     phone: '0964782553',
//   },
//   {
//     id: 12,
//     name: 'Tan B Bui',
//     birthday: '2012-10-17',
//     phone: '0964782553',
//   },
//   {
//     id: 13,
//     name: 'Tan B Bui',
//     birthday: '2012-01-17',
//     phone: '0964782553',
//   }
// ];

const pageSize = 5

const getData = (data, current, pageSize) => {
  return data.slice((current-1)*pageSize,current*pageSize)
}

const MyPagination = ({total, onChange, current}) => {
  return (
    <Pagination
    onChangePage={onChange}
      activePage={current}
      total={total} 
      limit={pageSize}
      style={{display:'flex',justifyContent:'center', marginTop:'30px',}}   
    />
    );
}

const a = window.innerWidth - 100;

export default function CustomTable() {
    const [current, setCurrent] = useState(1)
    const [width, setWidth] = useState(a)
    const { users } = useContext(GlobalContext)
    console.log(users);
    const navigate = useNavigate();

    useEffect(() => {
      const handleResize = () => {
        setWidth(window.innerWidth)
      }

      window.addEventListener('resize', handleResize)

      return () => {window.removeEventListener('resize', handleResize)}
      
    },[width])

    // console.log(width);
    return (
        <div className='table-data'>
            <Table 
            height={270}
            width={width}
            data={getData(users,current,pageSize)}
            onRowClick={data => {
              console.log(data);
            }}
            >
              <Table.Column width={width*0.3}>
                  <Table.HeaderCell>NAME</Table.HeaderCell>
                  <Table.Cell dataKey='name'/>
              </Table.Column >
              <Table.Column width={width*0.3}>
                  <Table.HeaderCell>PHONE</Table.HeaderCell>
                  <Table.Cell dataKey='phone'/>
              </Table.Column>
              <Table.Column width={width*0.3}>
                  <Table.HeaderCell>BIRTHDAY</Table.HeaderCell>
                  <Table.Cell dataKey='birthday'/>
              </Table.Column>
              <Table.Column width={width*0.1}>
                  <Table.HeaderCell style={{display:'flex', justifyContent:'center'}}>ACTIONS</Table.HeaderCell>
                  <Table.Cell>
                    {
                      rowData => {

                        const handleEdit = () => {
                          console.log('id: ', rowData.id);
                          console.log(('rowData', rowData));
                          navigate(`/users/${rowData.id}`, { state: { data: rowData} });
                        }

                        const handleDelete = () => {
                          console.log('id: ', rowData.id);
                        }
                        return (
                          <span style={{display:'flex', justifyContent:'space-evenly'}}>
                            <span onClick={handleEdit} style={{color:'red',cursor: 'pointer',fontSize: 18}}> <EditIcon/> </span> 
                            <span onClick={handleDelete} style={{color:'black',cursor: 'pointer', fontSize: 18}}> <TrashIcon/> </span>
                          </span>
                        );
                      }
                    }
                  </Table.Cell>
              </Table.Column>
            </Table>

            <MyPagination
              onChange={setCurrent}
              total={users.length}
              current={current}
            />
        </div>
    )
}
