export type NavItem = {
    navName: string;
    accessRole?: string[] | string;
    auth?: string;
    path?: string;
};

export const navList:NavItem[] = [
  {
    navName: 'home',
    accessRole: ['admin', 'user', 'bob','user01'],
    auth: 'authenticated',
    path: '/',
  },
  {
    navName: 'user',
    accessRole: ['admin', 'user', 'bob','user01'],
    auth: 'authenticated',
    path: '/user',
  },
  {
    navName: 'admin',
    accessRole: 'admin',
    auth: 'authenticated',
    path: './admin',
 
  },
  {
    navName: 'signout',
    accessRole: ['admin', 'user', 'bob','user01'],
    auth: 'authenticated',
  },
  {
    navName: 'sign in',
    path: '/signin',
    auth: 'unauthenticated',
  },
  
];
