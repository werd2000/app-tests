import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { SharedModule } from '../shared/shared.module';

// Components
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { PacienteComponent } from './pacientes/paciente.component';
// import { AccountSettingsComponent } from './account-settings/account-settings.component';

// Tests
import { TestsComponent } from './tests/tests.component';
import { TestComponent } from './tests/test.component';
import { WiscComponent } from './wisc/wisc.component';



import { PAGES_ROUTES } from './pages.routes';

// Pipe module
import { PipesModule } from '../pipes/pipes.module';

// Material
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';

// import { UsuariosComponent } from './usuarios/usuarios.component';
// import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
// import { ModalAlumnoComponent } from '../components/modal-alumno/modal-alumno.component';
// import { AlumnoComponent } from './alumnos/alumno.component';
// import { ListarAlumnosComponent } from './alumnos/listar-alumnos.component';
// import { FormDomicilioComponent } from '../components/form-domicilio/form-domicilio.component';
// import { BarraComponent } from '../components/barra/barra.component';
// import { ChartsModule } from 'ng2-charts';
// import { EstablecimientoComponent } from './establecimiento/establecimiento.component';
// import { MapaComponent } from '../components/mapa/mapa.component';
// import { FormContactoComponent } from '../components/form-contacto/form-contacto.component';
// import { FamiliaComponent } from '../components/familia/familia.component';
// import { PuestosComponent } from './puestos/puestos.component';

// import { AgmCoreModule } from '@agm/core';
// import { ModalPuestoComponent } from '../components/modal-puesto/modal-puesto.component';
// import { PuestoComponent } from '../components/puesto/puesto.component';
// import { RolesComponent } from './roles/roles.component';
// import { ModalRolesComponent } from '../components/modal-roles/modal-roles.component';

@NgModule({
    declarations: [
        DashboardComponent,
        ProfileComponent,
        PacientesComponent,
        PacienteComponent,
        TestsComponent,
        TestComponent,
        WiscComponent,
        // AccountSettingsComponent,
        // UsuariosComponent,
        // ListarAlumnosComponent,
        // ModalAlumnoComponent,
        // DocentesComponent,
        // ListarDocentesComponent,
        // DocenteComponent,
        // ModalDocenteComponent,
        // FormDomicilioComponent,
        // BarraComponent,
        // EstablecimientoComponent,
        // MapaComponent,
        // FormContactoComponent,
        // FamiliaComponent,
        // PuestosComponent,
        // ModalPuestoComponent,
        // PuestoComponent,
        // RolesComponent,
        // ModalRolesComponent
    ],
    exports: [
        DashboardComponent,
        // AccountSettingsComponent,
        // ModalUploadComponent,
        // ModalAlumnoComponent,
        // ModalDocenteComponent,
        // FormDomicilioComponent,
        // BarraComponent,
        // MapaComponent,
        // FormContactoComponent,
        // FamiliaComponent,
        // PuestosComponent,
        // ModalPuestoComponent,
        // PuestoComponent,
        // ModalRolesComponent
    ],
    imports: [
        // SharedModule,
        PAGES_ROUTES,
        PipesModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        // ChartsModule,
        // AgmCoreModule.forRoot({
        //     apiKey: 'AIzaSyBuCqnCBNbqbDAyxF6txubHkArRl-DlJb8'
        // }),
        MatInputModule,
        MatSelectModule,
        MatIconModule,
        MatDatepickerModule,
        MatNativeDateModule,
    ],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'es' },
    ]

})

export class PagesModule { }
