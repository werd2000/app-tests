import { Component, OnInit } from '@angular/core';
import { Paciente } from '../../models/paciente.model';
import { PacienteService, UsuarioService, WiscService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import { WiscTomado } from '../../models/wiscTomado.model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-paciente-wisc',
  templateUrl: './paciente-wisc.component.html',
  styles: []
})
export class PacienteWiscComponent implements OnInit {

  paciente: Paciente;
  pacientes: Paciente[];
  usuario: Usuario;
  test: WiscTomado;
  edadEvaluacion: number[] = [];
  edadMental: number[] = [];
  paramId: any;
  fechaEvaluacion: string;
  cargando = false;

  constructor(
    public activatedRoute: ActivatedRoute,
    public _pacienteService: PacienteService,
    public _usuarioService: UsuarioService,
    public _wiscService: WiscService
  ) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
    this.cargarMisPacientes();
    this.fechaEvaluacion = this.crearFecha();
    this.test = new WiscTomado('', this.fechaEvaluacion, 0, '', '');
    this.calcularEdadEvaluacion();
    this.activatedRoute.params.subscribe( params => {
      this.paramId = params['id'];
        if (this.paramId !== 'nuevo') {
          // this.cargarPaciente(this.paramId);
        } else {
          this.test = new WiscTomado('', new Date().toString(), 0, '', '');
        }
    });
  }

  crearFecha() {
    const anio = new Date().getFullYear();
    let mes = new Date().getMonth().toString();
    if (new Date().getMonth() < 10 ) {
      mes = '0' + (new Date().getMonth() + 1).toString();
    }
    const dia = new Date().getDate();
    const fecha = anio + '-' + mes + '-' + dia;
    return fecha;
  }

  cargarMisPacientes() {
    this.cargando = true;
    this._pacienteService.cargarPacientesTerapeuta(this.usuario._id)
      .subscribe( resp => {
        this.pacientes = resp;
        this.cargando = false;
      });
  }

  buscarPaciente(event: any) {
    this._pacienteService.obtenerPacienteId(event.target.value)
      .subscribe( (resp: Paciente) => {
        this.paciente = resp;
        this.calcularEdadEvaluacion();
      });
  }

  calcularEdadEvaluacion() {
    if ( this.fechaEvaluacion && this.paciente ) {
      const fechaEvaluacion = this.fechaEvaluacion.split('-');
      // const diaEvaluacion = fechaEvaluacion[2];
      // const mesEvaluacion = fechaEvaluacion[1];
      // const anioEvaluacion = fechaEvaluacion[0];
      const fechaNac = this.paciente.fecha_nac.split('-');
      // const diaNac = fechaNac[2];
      // const mesNac = fechaNac[1];
      // const anioNac = fechaNac[0];
      this.edadEvaluacion['anios'] = this.calcularEdadAnio(fechaEvaluacion, fechaNac);
      this.edadEvaluacion['meses'] = this.calcularEdadMeses(fechaEvaluacion, fechaNac);
      this.edadEvaluacion['dias'] = this.calcularEdadDias(fechaEvaluacion, fechaNac);
      // console.log('años', this.edadEvaluacion['anios']);
      // console.log('meses', this.edadEvaluacion['meses']);
      // console.log('dias', this.edadEvaluacion['dias']);
    }
    this.calcularGrupoEtareo();
    console.log(this.test.grupo_etareo);
  }

  calcularEdadAnio(fechaEvaluacion, fechaNac) {
    let edad = fechaEvaluacion[0] - fechaNac[0];
    if (fechaEvaluacion[1] < fechaNac[1]) {
      edad--;
    }
    if ((fechaEvaluacion[1] === fechaNac[1]) && (fechaEvaluacion[2] < fechaNac[2])) {
      edad--;
    }
    return edad;
  }

  calcularEdadMeses( fechaEvaluacion, fechaNac ) {
    let meses = 0;
    if (fechaEvaluacion[1] > fechaNac[1]) {
      meses = fechaEvaluacion[1] - fechaNac[1];
    }
    if (fechaEvaluacion[1] < fechaNac[1]) {
      meses = 12 - (fechaNac[1] - fechaEvaluacion[1]);
    }
    if ((fechaEvaluacion[1] = fechaNac[1]) && (fechaNac[2] > fechaEvaluacion[2])  ) {
      meses = 11;
    }
    return meses;
  }

  calcularEdadDias( fechaEvaluacion, fechaNac ) {
    let dias = 0;
    if (fechaEvaluacion[2] > fechaNac[2]) {
      dias = fechaEvaluacion[2] - fechaNac[2];
    }
    if (fechaEvaluacion[2] < fechaNac[2]) {
      const ultimoDiaMes = new Date(fechaEvaluacion[0], fechaEvaluacion[1], 0);
      dias = ultimoDiaMes.getDate() - (fechaNac[2] - fechaEvaluacion[2]);
    }
    return dias;
  }

  calcularGrupoEtareo() {
    if (this.edadEvaluacion <= 6 ) {
      this.test.grupo_etareo = '1';
    }
  }

  cambiarFechaEvaluacion(event: any) {
    this.fechaEvaluacion = event.target.value;
    this.calcularEdadEvaluacion();
  }

  guardarPaciente(f: WiscTomado) {
    console.log(f);
    f._id = f.paciente + f.fecha_eval;
    f.edad_eval = this.edadEvaluacion;
    this._wiscService.crearWisc(f)
      .then( resp => {
        swal('Datos guardados', 'Los datos del test fueron guardados', 'success');
      });
  }


}
