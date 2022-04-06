import './App.css';
import AddUser from './components/AddUser';
import CustomTable from './components/CustomTable';
import { GlobalProvider } from './context/GlobalState'

function App() {
  
  return (
    <GlobalProvider>
      <div className='manage-user'>
        <AddUser/>
        <div>
          <CustomTable/>
        </div>
      </div>
    </GlobalProvider>
  );
}

export default App;


//tham khao
//https://www.digitalocean.com/community/tutorials/react-crud-context-hooks#step-4-setting-up-routes