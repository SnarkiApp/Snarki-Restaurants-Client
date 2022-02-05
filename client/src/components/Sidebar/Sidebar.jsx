import React, { useState, useContext } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import {UserContext} from "../../providers/User/UserProvider";
import './Sidebar.css';

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const {user} = useContext(UserContext);

  return (
    <IconContext.Provider value={{ color: '#fff' }}>
      <div className='sidebar'>
        <Link to='#' className='menu-bars'>
          <FaIcons.FaBars onClick={showSidebar} />
        </Link>
      </div>
      <nav className={sidebar ? 'sidebar-menu active' : 'sidebar-menu'}>
        <ul className='sidebar-menu-items' onClick={showSidebar}>
          <li className='sidebar-toggle'>
            <Link to='#' className='menu-close'>
              <AiIcons.AiOutlineClose />
            </Link>
          </li>
          {SidebarData.map((item, index) => {

            if (item.path === '/snarki/register' && user) {
              return null;
            }
            if (item.path === '/dashboard' && !user) {
              return null;
            }

            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span className="sidebar-items">{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </IconContext.Provider>
  );
}

export default Sidebar;