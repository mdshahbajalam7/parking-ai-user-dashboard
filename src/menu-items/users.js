/* eslint-disable */
// assets
import { IconKey, IconUsers } from '@tabler/icons-react';

// constant
const icons = {
    IconKey, IconUsers
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'users',
    // title: 'Admin',
    // caption: 'Admin Caption',
    icon: icons.IconUsers,
    type: 'group',
    children: [
        {
            id: 'users',
            title: 'Admin Users',
            type: 'collapse',
            icon: icons.IconUsers,
            children: [
                // {
                //   id: 'login',
                //   title: 'login',
                //   type: 'item',
                //   url: '/pages/login',
                //   target: true
                // },
                {
                    id: 'users',
                    title: 'Users',
                    type: 'item',
                    url: '/admin/users-list',
                    // target: true
                }
            ]
        }
    ]
};

export default pages;
