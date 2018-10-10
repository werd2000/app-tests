export class Usuario {
    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public sexo?: string,
        public fnac?: string,
        public img?: string,
        public role?: string,
        public google?: boolean,
        public _id?: string,
        public misTests?: string,
        public estado: boolean = true
    ) { }
}
