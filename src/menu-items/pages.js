/* eslint-disable */
// assets
import { IconKey } from '@tabler/icons-react';

// constant
const icons = {
  IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'admin',
  // title: 'Admin',
  // caption: 'Admin Caption',
  icon: icons.IconKey,
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Authentication',
      type: 'collapse',
      icon: icons.IconKey,
      children: [
        // {
        //   id: 'login',
        //   title: 'login',
        //   type: 'item',
        //   url: '/pages/login',
        //   target: true
        // },
        {
          id: 'register',
          title: 'Registion',
          type: 'item',
          url: '/admin/register',
          // target: true
        }
      ]
    }
  ]
};

export default pages;
