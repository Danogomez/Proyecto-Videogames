
import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import {About, Detail, Form, Home, Landing} from '../src/views'
import NavBar from './components/NavBar/NavBar'
import axios from 'axios'
axios.defaults.baseURL='http://localhost:3001/'
//pepe
function App() {
    const location = useLocation()
  return (
    <>
      <div className='App'>
          {/* {location.pathname !== '/' ? <NavBar /> : null} */}

        <Routes>
          <Route path='/' element = {<Landing/>} />
          <Route path='/about' element = {<About/>} />
          <Route path='/home' element = {<Home/>} />
          <Route path='/detail/:detailId' element = {<Detail/>} />
          <Route path='/create' element = {<Form/>} />
        </Routes>
      </div>
     
    </>
  )
}

export default App
