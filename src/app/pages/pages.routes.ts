import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileComponent } from './profile/profile.component';
// import { UsuariosComponent } from './usuarios/usuarios.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { PacienteComponent } from './pacientes/paciente.component';
import { TestsComponent } from './tests/tests.component';
import { TestComponent } from './tests/test.component';
import { WiscComponent } from './wisc/wisc.component';
// import { EstablecimientoComponent } from './establecimiento/establecimiento.component';
// import { LoginGuard, AdminGuard } from '../services/service.index';
// import { PuestosComponent } from './puestos/puestos.component';
// import { RolesComponent } from './roles/roles.component';


const pagesRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' }},
    { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario' }},
    { path: 'pacientes', component: PacientesComponent, data: { titulo: 'Administración de pacientes' }},
    // { path: 'puestos', component: PuestosComponent, data: { titulo: 'Puestos de trabajo' }},
    // { path: 'roles', canActivate: [ AdminGuard ], component: RolesComponent, data: { titulo: 'Roles de usuario' }},
    { path: 'paciente/:id', component: PacienteComponent, data: { titulo: 'Edición de paciente' }},
    // Tests
    { path: 'tests', component: TestsComponent, data: { titulo: 'Administración de Tests' }},
    { path: 'test/:id', component: TestComponent, data: { titulo: 'Edición de Test' }},
    { path: 'wisc', component: WiscComponent, data: { titulo: 'WISC' }},
    // Establecimiento
    // { path: 'establecimiento', component: EstablecimientoComponent, data: { titulo: 'Establecimiento' }},
    // { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes'}},
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
