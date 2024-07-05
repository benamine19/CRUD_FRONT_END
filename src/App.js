import React from 'react'
import Princ from './pages/Princ';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './pages/Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <BrowserRouter>
              <ToastContainer autoClose={4000}  />
         <Routes>
              <Route path='/signup'  element={<Signup/>}/>
              <Route path='/login'  element={<Login/>}/>
              <Route  element={<Layout />}>
                <Route path='/'  element={<Princ/>}/>
              </Route>
         </Routes>
     </BrowserRouter>
  )
}

export default App