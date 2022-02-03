import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Contact from './components/Contact/Contact';
import Home from './components/Home/Home';
import Team from './components/Team/Team';
import RestaurantForm from './components/RestaurantForm/RestaurantForm';
import RestaurantPlan from './components/RestaurantPlan/RestaurantPlan';

const NavRoutes = ({propRef}) => (
    <Routes>
        <Route exact path='/contact' element={<Contact />}></Route>
        <Route exact path='/team' element={<Team />}></Route>
        <Route exact path='/snarki/:action' element={<RestaurantForm />}></Route>
        <Route exact path='/premium' element={<RestaurantPlan />}></Route>
        <Route exact path='/' element={<Home propRef={propRef} />}></Route>
    </Routes>
);

export default NavRoutes;
