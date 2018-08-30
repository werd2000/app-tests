import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Alumnos',
      icono: 'mdi mdi-account-multiple-outline',
      submenu: [
        {titulo: 'Listar', url: '/alumnos/listar'},
        {titulo: 'Crear', url: '/alumno/nuevo'}
      ]
    },
    {
      titulo: 'Docentes',
      icono: 'fa fa-users',
      submenu: [
        {titulo: 'Listar', url: '/docentes/listar'},
        {titulo: 'Crear', url: '/docente/nuevo'}
      ]
    },
    {
      titulo: 'Mantenimientos',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Usuarios', url: '/usuarios'},
        { titulo: 'Alumnos', url: '/alumnos'},
        { titulo: 'Docentes', url: '/docentes'},
        { titulo: 'Puestos', url: '/puestos'},
        { titulo: 'Roles', url: '/roles'},
      ]
    }
  ];

  constructor(
    public _usuarioService: UsuarioService
  ) { }

  cargarMenu() {
    // this.menu = this._usuarioService.menu;
    this.menu = this.menu;
  }

}