import React, {useContext} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Contact from './components/Contact/Contact';
import Home from './components/Home/Home';
import Team from './components/Team/Team';
import RestaurantForm from './components/RestaurantForm/RestaurantForm';
import RestaurantPlan from './components/RestaurantPlan/RestaurantPlan';
import ProtectedRoute from './components/ProtectedRoutes/ProtectedRoutes';
import DashboardPage from './DashboardComponents/DashboardPage/DashboardPage';
import ClaimRestaurant from './DashboardComponents/ClaimRestaurant/ClaimRestaurant';
import AddRestaurantBasic from './DashboardComponents/AddRestaurantBasic/AddRestaurantBasic';
import { UserContext } from './providers/User/UserProvider';

const NavRoutes = ({propRef}) => {
    const {user} = useContext(UserContext);

    return (
        <Routes>
            <Route exact path='/contact' element={<Contact />} />
            <Route exact path='/team' element={<Team />} />
            <Route exact path='/premium' element={<RestaurantPlan />} />
            <Route exact path='/' element={<Home propRef={propRef} />} />
            <Route path='/snarki/:action' element={
                user ? <Navigate to="/dashboard" /> : <RestaurantForm />
            } />
            <Route path='/dashboard' element={<ProtectedRoute />}>
                <Route exact path='/dashboard' element={<DashboardPage />}/>
                <Route exact path='/dashboard/claim-restaurant' element={<ClaimRestaurant />}/>
                <Route exact path='/dashboard/add-restaurant' element={<AddRestaurantBasic />}/>
            </Route>
        </Routes>
    );
};

export default NavRoutes;
