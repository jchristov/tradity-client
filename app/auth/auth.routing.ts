import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';

const authRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'login/:emailVerifCode/:uid',
    component: LoginComponent
  }
]

export const routing: ModuleWithProviders = RouterModule.forChild(authRoutes);