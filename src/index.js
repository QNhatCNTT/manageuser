import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import EditUser from './components/EditUser';

ReactDOM.createRoot(
  document.getElementById('root')
).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to='users' /> } >
        </Route>
        <Route path='users' element={<App/>} />
        <Route path='users/:id' element={<EditUser/>}/>
        {/* <Route path='*' element={<Navigate to='users' /> } /> */}
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
