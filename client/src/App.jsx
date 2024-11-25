import React from 'react'
import Routing from './components/Routing'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import './App.css'
const App = () => {
  return (
    <div>
      <ToastContainer
position="top-right"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
{/* Same as */}
      <Routing/>
    </div>
  )
}

export default App
