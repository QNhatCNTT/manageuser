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
