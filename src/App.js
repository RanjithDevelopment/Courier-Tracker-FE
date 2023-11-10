
import {Routes,Route} from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import Signup from './Components/Signup';
import TrackerForm from './Components/trackerForm';
import CreateCourier from './Components/createCourier';
import Table from './Components/Table';
import UsersTable from './Components/ViewUsers';
import Cards from './Components/cards';


function App() {
  return (
    <div className="App">
     <Routes>
      
        <Route path='/' element = {<Login/>}/>
        <Route path='/signup' element ={<Signup/>}/>
        <Route path='/tracker' element={<TrackerForm/>}/>
        <Route path='/admin' element={<Sidebar/>}/>
        <Route path='/addPackage' element={<CreateCourier/>}/>
        <Route path='/table' element={<Table/>}/>
        <Route path='/usertable' element={<UsersTable/>}/>
        <Route path='/cards' element={<Cards/>}/>
     </Routes>
     
   

    </div>
  );
}

export default App;
