import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICES } from '../config/config';
import { UsuarioService } from '../services/usuario/usuario.service';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  token: string;

  constructor(_usuarioService: UsuarioService) {
    this.token = _usuarioService.token;
  }

  transform(img: string, tipo: string = 'usuario'): any {

    // let url = 'assets/images/usuarios/';
    let url = URL_SERVICES + '/imagen';

    if (!img) {
      // return url + '/no-image.jpg' + '?token=' + this.token;
      img = 'no-image.jpg';
    }

    if (img.indexOf('https') >= 0 ) {
      return img;
    }

    switch ( tipo ) {
      case 'usuario':
        url += '/usuarios/' + img;
      break;
      case 'profesional':
        url += '/profesionales/' + img;
      break;
      case 'paciente':
        url += '/pacientes/' + img;
      break;
      case 'test':
        url += '/tests/' + img;
      break;
      default:
      console.log('Tipo de imagen no válida. Usuario, Profesional, Centro Médico');
      url += '/usuario/xxx';
    }
    // console.log(url);
    return url + '?token=' + this.token;
  }

}
