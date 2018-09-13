import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Tests',
      icono: 'fas fa-book',
      url: '/tests'
      // submenu: [
      //   { titulo: 'Listar', url: '/tests/listar' },
      //   { titulo: 'Crear', url: '/tests/nuevo' }
      // ]
    },
  ];

  constructor(
    public _usuarioService: UsuarioService
  ) { }

  cargarMenu() {
    // this.menu = this._usuarioService.menu;
    this.menu = this.menu;
  }

}
