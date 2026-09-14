/* eslint-disable */
// assets
import { IconBrandChrome, IconHelp } from '@tabler/icons-react';

// constant
const icons = { IconBrandChrome, IconHelp };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: 'sample-docs-roadmap',
  type: 'group',
  children: [
    {
      id: 'sample-page',
      title: 'Sample Page',
      type: 'item',
      url: '/sample-page',
      icon: icons.IconBrandChrome,
      breadcrumbs: false
    },
    // {
    //   id: 'documentation',
    //   title: 'Documentation',
    //   type: 'item',
    //   url: 'https://codedthemes.gitbook.io/berry/',
    //   icon: icons.IconHelp,
    //   external: true,
    //   target: true
    // }
  ]
};

export default other;
// /* eslint-disable */
// // assets
// import { IconBrandChrome, IconHelp, IconLogout } from '@tabler/icons-react';

// // constant
// const icons = { IconBrandChrome, IconHelp, IconLogout };

// // ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

// const other = {
//   id: 'sample-docs-roadmap',
//   type: 'group',
//   children: [
//     {
//       id: 'logout',
//       title: 'Logout',
//       type: 'item',
//       url: '/sample-page',
//       icon: icons.IconLogout,
//       breadcrumbs: false
//     },
//     // {
//     //   id: 'documentation',
//     //   title: 'Documentation',
//     //   type: 'item',
//     //   url: 'https://codedthemes.gitbook.io/berry/',
//     //   icon: icons.IconHelp,
//     //   external: true,
//     //   target: true
//     // }
//   ]
// };

// export default other;
