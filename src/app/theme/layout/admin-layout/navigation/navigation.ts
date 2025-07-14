import { Role } from 'src/app/theme/shared/components/_helpers/role';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  groupClasses?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavigationItem[];
  link?: string;
  description?: string;
  path?: string;
  role?: string[];
  disabled?: boolean;
  isMainParent?: boolean; // specify if item is main parent
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 'Dashboard',
    title: 'Dashboard',
    type: 'group',
    classes: 'first-group',
    icon: 'icon-navigation',
    role: [Role.Admin, Role.User],
    children: [
      {
        id: 'component',
        title: 'Dashboard',
        type: 'item',
        classes: 'nav-item',
        url: '/dashboard',
        icon: 'gold',
        // target: true,
        breadcrumbs: false,
        role: [Role.Admin, Role.User]
      }
    ]
  },
  {
    id: 'master',
    title: 'Master',
    type: 'group',
    classes: 'first-group',
    icon: 'icon-navigation',
    role: [Role.Admin, Role.User],
    children: [
      {
        id: 'component',
        title: 'Room',
        type: 'item',
        classes: 'nav-item',
        url: '/room',
        icon: 'gold',
        // target: true,
        breadcrumbs: false,
        role: [Role.Admin, Role.User]
      },
      {
        id: 'component',
        title: 'User',
        type: 'item',
        classes: 'nav-item',
        url: '/users',
        icon: 'gold',
        // target: true,
        breadcrumbs: false,
        role: [Role.Admin, Role.User]
      }
    ]
  },
  {
    id: 'transaction',
    title: 'Transaction',
    type: 'group',
    classes: 'first-group',
    icon: 'icon-navigation',
    role: [Role.Admin, Role.User],
    children: [
      {
        id: 'component',
        title: 'Booking',
        type: 'item',
        classes: 'nav-item',
        url: '/sewa',
        icon: 'gold',
        // target: true,
        breadcrumbs: false,
        role: [Role.Admin, Role.User]
      }
    ]
  },
  {
    id: 'report',
    title: 'Repors',
    type: 'group',
    classes: 'first-group',
    icon: 'icon-navigation',
    role: [Role.Admin, Role.User],
    children: [
      {
        id: 'component',
        title: 'Daily',
        type: 'item',
        classes: 'nav-item',
        url: '/report-daily',
        icon: 'gold',
        // target: true,
        breadcrumbs: false,
        role: [Role.Admin, Role.User]
      }
    ]
  },
  // {
  //   id: 'other',
  //   title: 'Other',
  //   type: 'group',
  //   icon: 'icon-navigation',
  //   role: [Role.Admin, Role.User],
  //   children: [
  //     {
  //       id: 'sample-page',
  //       title: 'Sample Page',
  //       type: 'item',
  //       url: '/sample-page',
  //       classes: 'nav-item',
  //       icon: 'chrome'
  //     },
  //     {
  //       id: 'menu-levels',
  //       title: 'Menu levels',
  //       type: 'collapse',
  //       icon: 'menu-unfold',
  //       role: [Role.Admin, Role.User],
  //       children: [
  //         {
  //           id: 'menu-level-2-1',
  //           title: 'Menu Level 2.1',
  //           type: 'item',
  //           url: '/dashboard',
  //           external: true
  //         },
  //         {
  //           id: 'menu-level-2.2',
  //           title: 'Menu Level 2.2',
  //           type: 'collapse',
  //           role: [Role.Admin, Role.User],
  //           classes: 'edge',
  //           children: [
  //             {
  //               id: 'menu-level-3.1',
  //               title: 'Menu Level 3.1',
  //               type: 'item',
  //               url: 'javascript:',
  //               external: true
  //             },
  //             {
  //               id: 'menu-level-3.2',
  //               title: 'Menu Level 3.2',
  //               type: 'item',
  //               url: 'javascript:',
  //               external: true
  //             },
  //             {
  //               id: 'menu-level-2.2',
  //               title: 'Menu Level 2.2',
  //               type: 'collapse',
  //               role: [Role.Admin, Role.User],
  //               classes: 'edge',
  //               children: [
  //                 {
  //                   id: 'menu-level-4.1',
  //                   title: 'Menu Level 4.1',
  //                   type: 'item',
  //                   url: 'javascript:',
  //                   external: true
  //                 },
  //                 {
  //                   id: 'menu-level-4.2',
  //                   title: 'Menu Level 4.2',
  //                   type: 'item',
  //                   url: 'javascript:',
  //                   external: true
  //                 }
  //               ]
  //             }
  //           ]
  //         },
  //         {
  //           id: 'menu-level-2.3',
  //           title: 'Menu Level 2.3',
  //           type: 'collapse',
  //           role: [Role.Admin, Role.User],
  //           classes: 'edge',
  //           children: [
  //             {
  //               id: 'menu-level-3.1',
  //               title: 'Menu Level 3.1',
  //               type: 'item',
  //               url: 'javascript:',
  //               external: true
  //             },
  //             {
  //               id: 'menu-level-3.2',
  //               title: 'Menu Level 3.2',
  //               type: 'item',
  //               url: 'javascript:',
  //               external: true
  //             },
  //             {
  //               id: 'menu-level-3.3',
  //               title: 'Menu Level 3.3',
  //               type: 'collapse',
  //               classes: 'edge',
  //               role: [Role.Admin, Role.User],
  //               children: [
  //                 {
  //                   id: 'menu-level-4.1',
  //                   title: 'Menu Level 4.1',
  //                   type: 'item',
  //                   url: 'javascript:',
  //                   external: true
  //                 },
  //                 {
  //                   id: 'menu-level-4.2',
  //                   title: 'Menu Level 4.2',
  //                   type: 'item',
  //                   url: 'javascript:',
  //                   external: true
  //                 }
  //               ]
  //             }
  //           ]
  //         }
  //       ]
  //     }
  //   ]
  // }
];
