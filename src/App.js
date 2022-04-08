import { Navigate, Route, Routes } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalState'
import './App.css';
import Layout from './components/Layout';
import EditUser from './components/EditUser'

function App() {
  
    return (
      <GlobalProvider>
          <div className='manage-user'>
              <Routes>
                <Route path='/' element={<Navigate to='users' /> } />
                <Route path='users' element={<Layout/>} />
                <Route path='users/:id' element={<EditUser />}/>
                <Route path='*' element={<Navigate to='users' /> } />
              </Routes>
          </div>
      </GlobalProvider>
    );
}

export default App;


//tham khao
//https://stackoverflow.com/questions/64841268/how-can-i-use-an-axios-get-call-inside-a-context-provider-in-react
//https://stackoverflow.com/questions/65877884/how-to-fetch-data-and-store-in-react-context-api