import './App.css'
import {BrowserRouter as Router, Routes, Route} from "react-router";
import Home from './pages/Home';
import DefaultLayout from './layout/DefaultLayout/DefaultLayout';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import AuthLayout from './layout/AuthLayout/AuthLayout';


function App() {  
  return (
    <Router basename='/f8-React-Day-42'>

      <Routes>
          <Route element={<DefaultLayout/>}>
            <Route path="/" element={<Home/>}/>
          </Route>
 
        <Route element={<AuthLayout/>}>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Route>
      </Routes>

    </Router>
  )
}

export default App;
