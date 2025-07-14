// Angular Imports
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// project import
import { AdminLayout } from './theme/layout/admin-layout/admin-layout.component';
import { GuestLayouts } from './theme/layout/guest-layout/guest-layout.component';
import { AuthGuardChild } from './theme/shared/components/_helpers/auth.guard';
import { Role } from './theme/shared/components/_helpers/role';

const routes: Routes = [
  {
    path: '',
    component: GuestLayouts,
    children: [
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        loadComponent: () => import('./demo/authentication/auth-login/auth-login.component').then((c) => c.AuthLoginComponent)
      },
      // {
      //   path: 'register',
      //   loadComponent: () => import('./demo/authentication/auth-register/auth-register.component').then((c) => c.AuthRegisterComponent)
      // },
      // {
      //   path: 'forgot-password',
      //   loadComponent: () =>
      //     import('./demo/authentication/forgot-password/forgot-password.component').then((c) => c.ForgotPasswordComponent)
      // }
    ]
  },
  {
    path: '',
    component: AdminLayout,
    canActivateChild: [AuthGuardChild],
    children: [
      // {
      //   path: 'sample-page',
      //   loadComponent: () => import('./demo/sample-page/sample-page.component'),
      //   data: { roles: [Role.Admin, Role.User] }
      // },
      {
        path: 'dashboard',
        loadComponent: () => import('./entities/dashboard/dashboard.component').then((c)=>c.DashboardComponent),
        data: { roles: [Role.Admin, Role.User] }
      },
      {
        path: 'room',
        loadComponent: () => import('./entities/master-room/master-room.component').then((c)=>c.MasterRoomComponent),
        data: { roles: [Role.Admin, Role.User] }
      },
      {
        path: 'room-detail',
        loadComponent: () => import('./entities/master-room/master-room-edit/master-room-edit.component').then((c)=>c.MasterRoomEditComponent),
        data: { roles: [Role.Admin, Role.User] }
      },
      {
        path: 'sewa',
        loadComponent: () => import('./entities/sewa/sewa.component').then((c)=>c.SewaComponent),
        data: { roles: [Role.Admin, Role.User] }
      },
      {
        path: 'sewa-detail',
        loadComponent: () => import('./entities/sewa/sewa-edit/sewa-edit.component').then((c)=>c.SewaEditComponent),
        data: { roles: [Role.Admin, Role.User] }
      },
      {
        path: 'report-daily',
        loadComponent: () => import('./entities/share/report/report-daily/report-daily.component').then((c)=>c.ReportDailyComponent),
        data: { roles: [Role.Admin, Role.User] }
      },
      {
        path: 'report-monthly',
        loadComponent: () => import('./entities/share/report/report-monthly/report-monthly.component').then((c)=>c.ReportMonthlyComponent),
        data: { roles: [Role.Admin, Role.User] }
      },
      {
        path: 'users',
        loadComponent: () => import('./entities/user/user.component').then((c)=>c.UserComponent),
        data: { roles: [Role.Admin, Role.User] }
      },
      {
        path: 'users-detail',
        loadComponent: () => import('./entities/user/user-edit/user-edit.component').then((c)=>c.UserEditComponent),
        data: { roles: [Role.Admin, Role.User] }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
