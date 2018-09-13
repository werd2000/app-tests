import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
// import { arch } from 'os';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: string;
  listaSexos = ['Varón', 'Mujer'];
  startDate = new Date(1980, 0, 1);

  constructor( public _usuarioService: UsuarioService ) {
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {
  }

  guardar( usuario: Usuario ) {
    console.log(usuario);
    this.usuario.nombre = usuario.nombre;
    // lo saco porque no debe modificar el email
    // this.usuario.email = usuario.email;
    this._usuarioService.actualizarUsuario(this.usuario)
      .then( () => {
        this._usuarioService.guardarStorage(this.usuario.email, 'true', this.usuario, '');
        swal('Datos actualizados', this.usuario.nombre, 'success' );
      })
      .catch(err => console.log(err));
  }

  seleccionImagen( archivo: File ) {
    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }
    if ( archivo.type.indexOf('image')) {
      swal('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }
    this.imagenSubir = archivo;

    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL( archivo );
    reader.onloadend = () => this.imagenTemp = reader.result;

  }

  // Toma el archivo y lo lleva al servicio
  cambiarImagen() {
    this._usuarioService.cambiarImagen(this.imagenSubir, this.usuario);
  }

}
