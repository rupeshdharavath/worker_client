import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Navbar from './componenets/Navbar';
import Home from './componenets/Home';
import Login from './componenets/Login';
import Signup from './componenets/Signup';
import Profile from './componenets/Profile';
import Applications_create from './componenets/Applications_create';
import View_application from './componenets/View_application';
import Hire from './componenets/Hire';
import Notification from './componenets/Notification';
import Fix_slot from './componenets/Fix_slot';
function App(){
  return(
  <>
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/application_create' element={<Applications_create/>}/>
        <Route path='/view_application' element={<View_application/>}/>
        <Route path='/hire' element={<Hire/>}/>
        <Route path='/notification' element={<Notification/>}/>
        <Route path='/fix_slot' element={<Fix_slot/>}/>
      </Routes>
    </Router>
    
  </>
  )
}
export default App;