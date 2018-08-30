import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { AccountSettingsComponent } from './account-settings/account-settings.component';
// import { ProfileComponent } from './profile/profile.component';
// import { UsuariosComponent } from './usuarios/usuarios.component';
// import { AlumnosComponent } from './alumnos/alumnos.component';
// import { DocentesComponent } from './docentes/docentes.component';
// import { AlumnoComponent } from './alumnos/alumno.component';
// import { ListarAlumnosComponent } from './alumnos/listar-alumnos.component';
// import { EstablecimientoComponent } from './establecimiento/establecimiento.component';
// import { LoginGuard, AdminGuard } from '../services/service.index';
// import { ListarDocentesComponent } from './docentes/listar-docentes.component';
// import { DocenteComponent } from './docentes/docente.component';
// import { PuestosComponent } from './puestos/puestos.component';
// import { RolesComponent } from './roles/roles.component';


const pagesRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' }},
    // { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario' }},
    // Mantenimientos
    // {
    //     path: 'usuarios',
    //     component: UsuariosComponent,
    //     canActivate: [ AdminGuard ],
    //     data: { titulo: 'Mantenimiento de usuarios' }
    // },
    // { path: 'alumnos', component: AlumnosComponent, data: { titulo: 'Mantenimiento de alumnos' }},
    // { path: 'docentes', component: DocentesComponent, data: { titulo: 'Mantenimiento de docentes' }},
    // { path: 'puestos', component: PuestosComponent, data: { titulo: 'Puestos de trabajo' }},
    // { path: 'roles', canActivate: [ AdminGuard ], component: RolesComponent, data: { titulo: 'Roles de usuario' }},
    // Alumnos
    // { path: 'alumnos/listar', component: ListarAlumnosComponent, data: { titulo: 'Lista de alumnos' }},
    // { path: 'alumno/:id', component: AlumnoComponent, data: { titulo: 'Edición de alumnos' }},
    // Docentes
    // { path: 'docentes/listar', component: ListarDocentesComponent, data: { titulo: 'Lista de docentes' }},
    // { path: 'docente/:id', component: DocenteComponent, data: { titulo: 'Edición de docentes' }},
    // Establecimiento
    // { path: 'establecimiento', component: EstablecimientoComponent, data: { titulo: 'Establecimiento' }},
    // { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes'}},
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
