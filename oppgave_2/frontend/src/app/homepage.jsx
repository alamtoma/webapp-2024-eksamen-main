import React from 'react'
import {BrowserRouter, Router, Route} from "react-router-dom";
import { home } from '../pages/home';
const homepage = () => {
  return (
    <BrowserRouter>
        <Router>
            <Route path='/' element={<home/>}></Route>
        </Router>
    </BrowserRouter>
  )
}

export default homepage