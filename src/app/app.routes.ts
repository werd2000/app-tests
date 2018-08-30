import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages/pages.component';

import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { RegisterComponent } from './login/register.component';
import { TerminosComponent } from './login/terminos.component';
// import { ForbiddonerrorComponent } from './shared/forbiddonerror/forbiddonerror.component';
// import { LoginGuard } from './services/service.index';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'terminos', component: TerminosComponent},
    {
        path: '',
        component: PagesComponent,
        // canActivate: [ LoginGuard ],
        loadChildren: './pages/pages.module#PagesModule'
    },
    // { path: 'nopermiso', component: ForbiddonerrorComponent},
    { path: '**', component: NopagefoundComponent}
];

export const APP_ROUTES = RouterModule.forRoot( appRoutes, {useHash: true} );
