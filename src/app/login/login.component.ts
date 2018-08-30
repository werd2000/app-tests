import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import swal from 'sweetalert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean;
  recuperarPass = false;

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService
  ) {
    this.recuerdame = false;
  }

  ngOnInit() {
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.recuerdame = true;
    }
  }

  // ===================================================
  // Método para ingresar con usuario y password
  // ===================================================
  ingresar( forma: NgForm) {
    if (forma.invalid) {
      return;
    }

    const usuario = new Usuario(null, forma.value.email, forma.value.password);

    this._usuarioService.login(usuario, forma.value.recuerdame)
        .subscribe( resp => {
          if (resp !== undefined) {
            this._usuarioService.guardarStorage(usuario.email, 'true', resp, '');
            this.router.navigate(['/dashboard']);
          } else {
            swal('Error al ingresar', 'No coinciden las credenciales', 'error');
          }
        });
  }

}
