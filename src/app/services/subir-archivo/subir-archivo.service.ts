import { Injectable } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { Usuario } from '../../models/usuario.model';
import { Paciente } from '../../models/paciente.model';
import { Test } from '../../models/test.model';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  private CARPETA_IMAGENES = 'img-tests';

  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore
  ) { }

  subirArchivo( archivo: File, tipo: string, objeto: Usuario | Paciente | Test) {
    const nombreCortado = archivo.name.split('.');
    const extension = nombreCortado[nombreCortado.length - 1];
    // console.log(extension);
    const extensionesValidas = ['png', 'jpg', 'gif'];
    if (extensionesValidas.indexOf(extension) < 0 ) {
      swal('Extensión no válida', 'Las extensiones válidas son ' + extensionesValidas.join(', '), 'error');
    }

    const nombreArchivo = `${objeto._id}-${new Date().getMilliseconds()}.${extension}`;

    const ref = this.storage.ref(`/${this.CARPETA_IMAGENES}/${tipo}/${nombreArchivo}`);
    return ref.put(archivo)
      .then( resp => {
        return resp.ref.getDownloadURL();
      })
      .then( r => {
        objeto.img = r;
        this.guardarImagen(tipo, objeto)
          .then ( guardado => swal('Imagen guardada', 'La imagen se guardó con éxito', 'success')
          );
        return objeto;
      });
  }

  private guardarImagen(tipo: string, objeto: Usuario | Paciente | Test) {
    switch (tipo) {
      case 'usuario':
        return this.afs.collection('usuarios-tests').doc(objeto._id).set(objeto);
      case 'paciente':
        return this.afs.collection('pacientes-tests').doc(objeto._id).set(objeto);
      case 'test':
        return this.afs.collection('tests').doc(objeto._id).set(objeto);
      default:
        return null;
    }
  }
}
