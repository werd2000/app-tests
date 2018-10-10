import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../services/service.index';

import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

import swal from 'sweetalert';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;
  existe = true;

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }

  sonIguales(campo1: string, campo2: string) {
    return ( grupo: FormGroup ) => {

      const pass1 = grupo.controls[campo1].value;
      const pass2 = grupo.controls[campo2].value;

      if ( pass1 === pass2 ) {
        return null;
      }
      return { sonIguales: true };
    };
  }

  ngOnInit() {
    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      email: new FormControl( null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false)
    }, {validators: this.sonIguales('password', 'password2')});
  }

  registrarUsuario() {

    if (this.forma.invalid) {
      return;
    }

    if ( !this.forma.value.condiciones ) {
      console.log('Debe aceptar las condiciones');
      sweetAlert('Importante', 'Debe aceptar las condiciones.', 'warning');
      return;
    }

    const usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.email,
      this.forma.value.password
    );

    this._usuarioService.crearUsuario( usuario )
      .subscribe( resp => this.router.navigate(['/login']) );
  }
}
