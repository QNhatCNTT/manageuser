import './App.css';
import AddUser from './components/AddUser';
import CustomTable from './components/CustomTable';

function App() {
  
  return (
    <div className='manage-user'>
      <AddUser/>
      <div>
        <CustomTable/>
      </div>
    </div>
  );
}

export default App;
