import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  mostrar = false;
  usuario: Usuario;

  constructor(
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
  }

  mostrarMenuUsuario(e) {
    this.mostrar = true;
  }

  ocultarMenuUsuario( e ) {
    if (this.mostrar === false) {
      this.mostrar = true;
      // console.log(this.mostrar);
    } else {
      this.mostrar = false;
      // console.log(this.mostrar);
    }
  }

}
