import React, { useEffect, useState } from 'react'
import { Table, Pagination } from 'rsuite'
import EditIcon from '@rsuite/icons/Edit';
import TrashIcon from '@rsuite/icons/Trash';


const mockData = [
  {
    id: 1,
    name: 'Van Hai Pham',
    birthday: '2022-03-17',
    phone: '0964782553',
  },
  {
    id: 2,
    name: 'Van A Nguyen', 
    birthday: '2022-03-17',
    phone: '0964782553',
  },
  {
    id: 3,
    name: 'Thanh D Tran',
    birthday: '2022-03-17',
    phone: '0964782553',
  },
  {
    id: 4,
    name: 'Thi E Nguyen',
    birthday: '2022-03-17',
    phone: '0964782553',
  },
  {
    id: 5,
    name: 'Tan B Bui',
    birthday: '2022-03-17',
    phone: '0964782553',
  },
  {
    id: 6,
    name: 'Tan B Bui',
    birthday: '2022-03-17',
    phone: '0964782553',
  },
  {
    id: 7,
    name: 'Tan B Bui',
    birthday: '2022-03-17',
    phone: '0964782553',
  },
  {
    id: 8,
    name: 'Tan B Bui',
    birthday: '2022-03-17',
    phone: '0964782553',
  },
  {
    id: 9,
    name: 'Tan B Bui',
    birthday: '2022-03-17',
    phone: '0964782553',
  },
  {
    id: 10,
    name: 'Tan B Bui',
    birthday: '2022-03-17',
    phone: '0964782553',
  },
  {
    id: 11,
    name: 'Tan B Bui',
    birthday: '2022-03-17',
    phone: '0964782553',
  },
  {
    id: 12,
    name: 'Tan B Bui',
    birthday: '2022-03-17',
    phone: '0964782553',
  },
  {
    id: 13,
    name: 'Tan B Bui',
    birthday: '2022-03-17',
    phone: '0964782553',
  }
];

const pageSize = 5

const getData = (current, pageSize) => {
  return mockData.slice((current-1)*pageSize,current*pageSize)
}

const MyPagination = ({total, onChange, current}) => {
  return (
    <Pagination
    onChangePage={onChange}
      activePage={current}
      total={total} 
      limit={pageSize}
      style={{display:'flex',justifyContent:'center', marginTop:'30px'}}   
    />
    );
}

const a = window.innerWidth - 100;

export default function CustomTable() {
    const [current, setCurrent] = useState(1)
    const [width, setWidth] = useState(a)
    useEffect(() => {
      const handleResize = () => {
        setWidth(window.innerWidth)
      }

      window.addEventListener('resize', handleResize)

      return () => {window.removeEventListener('resize', handleResize)}
      
    },[width])

    console.log(width);
    return (
        <div className='table-data'>
            <Table 
            height={270}
            width={width}
            data={getData(current,pageSize)}
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

                        const handleAction = () => {
                          console.log('id: ', rowData.id);
                        }

                        return (
                          <span style={{display:'flex', justifyContent:'space-evenly'}}>
                            <span onClick={handleAction} style={{color:'red',cursor: 'pointer',fontSize: 18}}> <EditIcon/> </span> 
                            <span onClick={handleAction} style={{color:'black',cursor: 'pointer', fontSize: 18}}> <TrashIcon/> </span>
                          </span>
                        );
                      }
                    }
                  </Table.Cell>
              </Table.Column>
            </Table>

            <MyPagination
              onChange={setCurrent}
              total={mockData.length}
              current={current}
            />
        </div>
    )
}
