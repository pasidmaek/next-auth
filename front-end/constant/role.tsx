export type NavItem = {
  navName: string;
  accessRole?: string[] | string;
  auth?: string;
  path?: string;
};

export const navList: NavItem[] = [
  {
    navName: 'home',
    accessRole: ['admin', 'user', 'bob','user01','manager'],
    path: '/',
  },
  {
    navName: 'user',
    accessRole: ['admin', 'user', 'bob','user01',],
    path: '/user',
  },
  {
    navName: 'admin',
    accessRole: 'admin',
    auth: 'unauthenticated',
    path: './admin',
 
  },
  {
    navName: 'signout',
    accessRole: ['admin', 'user', 'bob','user01','manager'],
  },
  {
    navName: 'sign in',
    path: '/signin',
    accessRole: [],
  },
];
