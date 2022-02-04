import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'sidebar-text'
  },
  {
    title: 'Premium',
    path: '/premium',
    icon: <AiIcons.AiTwotoneStar />,
    cName: 'sidebar-text'
  },
  {
    title: 'Team',
    path: '/team',
    icon: <IoIcons.IoMdPeople />,
    cName: 'sidebar-text'
  },
  {
    title: 'Contact',
    path: '/contact',
    icon: <IoIcons.IoMdContact />,
    cName: 'sidebar-text'
  },
  {
    title: 'Sign Up',
    path: '/snarki/register',
    icon: <IoIcons.IoIosLogIn />,
    cName: 'sidebar-text'
  }
];
