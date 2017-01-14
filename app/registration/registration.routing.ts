import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrationComponent } from './registration.component';

const registrationRoutes: Routes = [
  {
    path: 'register',
    component: RegistrationComponent
  }
]

export const routing: ModuleWithProviders = RouterModule.forChild(registrationRoutes);