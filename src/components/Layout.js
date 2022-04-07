import React from 'react'
import AddUser from './AddUser'
import UserTable from './UserTable'

export default function Layout() {
  return (
    <React.Fragment>
        <div>
        <AddUser/>
        <div>
          <UserTable/>
        </div>
      </div>
    </React.Fragment>
  )
}
