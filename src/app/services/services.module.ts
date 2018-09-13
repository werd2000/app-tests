import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  UsuarioService,
//   SettingsService,
//   SharedService,
  SidebarService,
//   LoginGuard,
//   AdminGuard,
  SubirArchivoService,
//   ModalUploadService,
  PacienteService,
  TestService,
//   DocenteService,
//   RolesService,
//   ModalRolesService,
//   ExportPdfService,
//   ImageToBase64Service,
//   PrintService,
//   CopyService,
//   CsvService
//   VerificaTokenGuard
} from './service.index';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    // SettingsService,
    // SharedService,
    SidebarService,
    UsuarioService,
    // LoginGuard,
    // AdminGuard,
    SubirArchivoService,
    // ModalUploadService,
    PacienteService,
    TestService,
    // RolesService,
    // ModalRolesService,
    // ExportPdfService,
    // ImageToBase64Service,
    // PrintService,
    // CopyService,
    // CsvService
    // VerificaTokenGuard
  ]
})
export class ServiceModule { }
