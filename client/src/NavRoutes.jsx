import React, {useContext} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Contact from './components/Contact/Contact';
import Home from './components/Home/Home';
import Team from './components/Team/Team';
import RestaurantForm from './components/RestaurantForm/RestaurantForm';
import RestaurantPlan from './components/RestaurantPlan/RestaurantPlan';
import { UserContext } from './providers/User/UserProvider';

const NavRoutes = ({propRef}) => {
    const {user} = useContext(UserContext);

    return (
        <Routes>
            <Route exact path='/contact' element={<Contact />}></Route>
            <Route exact path='/team' element={<Team />}></Route>
            <Route exact path='/premium' element={<RestaurantPlan />}></Route>
            <Route exact path='/' element={<Home propRef={propRef} />}></Route>
            <Route path='/dashboard' element={!user ? <Navigate to="/snarki/register" /> : <RestaurantForm />} />
            <Route path='/snarki/:action' element={user ? <Navigate to="/dashboard" /> : <RestaurantForm />} />
        </Routes>
    );
};

export default NavRoutes;
