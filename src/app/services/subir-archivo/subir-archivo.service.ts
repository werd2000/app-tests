import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { Paciente } from '../../models/paciente.model';
import { Test } from '../../models/test.model';
import { URL_SERVICES } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  private CARPETA_IMAGENES = 'img-tests';

  constructor(
  ) { }

  subirArchivo( archivo: File, tipo: string, id: string) {
    return new Promise((resolve, reject) => {

      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      formData.append('archivo', archivo, archivo.name);

      xhr.onreadystatechange = function() {
        console.log(xhr.readyState);

        if ( xhr.readyState === 4 ) {

          if ( xhr.status === 200 ) {
            console.log( 'Imagen subida' );
            resolve( JSON.parse( xhr.response ) );
          } else {
            console.log( 'Fallo la subida' );
            reject( xhr.response );
          }
        }
      };

      let url = URL_SERVICES + '/upload/' + tipo + '/' + id;
      console.log(url);

      xhr.open('PUT', url, true );
      xhr.send( formData );
    });
  }

}
