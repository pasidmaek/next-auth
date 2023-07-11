export type NavItem = {
    navName: string;
    accessRole?: string[] | string;
    auth?: string;
    path?: string;
};

export const navList:NavItem[] = [
  {
    navName: 'home',
    accessRole: ['admin', 'user'],
    auth: 'authenticated',
    path: '/',
  },
  {
    navName: 'user',
    accessRole: ['admin', 'user'],
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
    accessRole: ['admin', 'user'],
    auth: 'authenticated',
  },
  {
    navName: 'signin',
    path: '/signin',
    auth: 'unauthenticated',
  },
  
];
