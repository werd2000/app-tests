import { Domicilio } from './domicilio.model';
// import { Contacto } from './contacto.model';

export class Paciente {
    constructor(
        public apellido: string,
        public nombre: string,
        public tipo_doc: string,
        public nro_doc: string,
        public nacionalidad: string,
        public sexo: string,
        public cargado_por: string,
        public actualizado: string,
        public fecha_nac?: string,
        public domicilio?: Domicilio,
        // public contactos: Contacto[],
        public img?: string,
        public _id?: string
    ) { }
}
