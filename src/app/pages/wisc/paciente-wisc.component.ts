import { Component, OnInit } from '@angular/core';
import { Paciente } from '../../models/paciente.model';
import { PacienteService, UsuarioService, WiscService, GrupoEtareoService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import { WiscTomado } from '../../models/wiscTomado.model';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert';
import * as moment from 'moment';

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
  fechaEvaluacion: any;
  cargando = false;

  constructor(
    public activatedRoute: ActivatedRoute,
    public _pacienteService: PacienteService,
    public _usuarioService: UsuarioService,
    public _wiscService: WiscService,
    public _grupoEtareoService: GrupoEtareoService
  ) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
    this.cargarMisPacientes();
    // this.test = new WiscTomado('', fechaEval, 0, '', '');
    this.activatedRoute.params.subscribe( params => {
      this.paramId = params['id'];
      if (this.paramId !== 'nuevo') {
        this._wiscService.obtenerWicsId(this.paramId)
          .subscribe( resp => {
            this.test = resp;
            this.paciente = resp.paciente;
            this.fechaEvaluacion = moment(this.test.fecha_eval);
            // const fechaEval = this.armarFecha();
            this.calcularEdadEvaluacion();
          });
      } else {
        this.fechaEvaluacion = new Date();
        const fechaEval = this.armarFecha();
        this.fechaEvaluacion = moment(fechaEval);
        this.test = new WiscTomado('', fechaEval, '', '', '');
      }
    });
    // this.calcularEdadEvaluacion();
  }

  buscarPrueba(id: string) {
    this._wiscService.obtenerWicsId(id)
      .subscribe( resp => {
        this.test = resp;
        // console.log(this.test);
        this.paciente = resp.paciente;
        this.calcularEdadEvaluacion();
      });
  }

  cargarMisPacientes() {
    this.cargando = true;
    this._pacienteService.cargarPacientesTerapeuta(this.usuario._id)
      .subscribe( resp => {
        this.pacientes = resp;
        this.cargando = false;
      });
  }

  buscarPac( event: any ) {
    const pac = event.target.value;
    this.buscarPaciente(pac);
  }

  buscarPaciente(pac: any) {
    this._pacienteService.obtenerPacienteId(pac)
      .subscribe( (resp: Paciente) => {
        // console.log(resp);
        this.paciente = resp;
        this.calcularEdadEvaluacion();
      });
  }

  calcularEdadEvaluacion() {
    if ( this.fechaEvaluacion && this.paciente ) {
      // const fechaEval = moment(this.fechaEvaluacion);
      const fechaEval = this.fechaEvaluacion;
      const fechaNac = moment(this.paciente.fecha_nac);
      this.edadEvaluacion['anios'] = fechaEval.diff(fechaNac, 'years');
      this.edadEvaluacion['meses'] = this.calcularEdadMeses(fechaEval, fechaNac);
      // this.edadEvaluacion['dias'] = this.calcularEdadDias(fechaEval, fechaNac);
    }
    const edad = this.edadEvaluacion['anios'] + this.edadEvaluacion['meses'] / 10;
    this.test.grupo_etareo = this._grupoEtareoService.buscarGrupo(edad);
  }

  calcularEdadMeses( fechaEvaluacion, fechaNac ) {
    let meses = fechaEvaluacion.diff(fechaNac, 'months');
    if (this.edadEvaluacion['anios'] > 0 ) {
      meses = meses - this.edadEvaluacion['anios'] * 12;
    }
    return Math.trunc(meses);
  }

  calcularEdadDias( fechaEvaluacion, fechaNac ) {
    let dias = fechaEvaluacion.diff(fechaNac, 'days');
    console.log(dias);
    if (this.edadEvaluacion['anios'] > 0 ) {
      dias = dias - this.edadEvaluacion['anios'] * 365;
      console.log(dias);
    }
    if (this.edadEvaluacion['meses'] > 0 ) {
      dias = dias - this.edadEvaluacion['meses'] * 30;
    }
    return Math.trunc(dias);
  }

  cambiarFechaEvaluacion(event: any) {
    this.fechaEvaluacion = moment(event.target.value);
    this.calcularEdadEvaluacion();
  }

  guardarPaciente(f: WiscTomado) {
    f.edad_eval = this.edadEvaluacion['anios'] + ' años ' + this.edadEvaluacion['meses'] + ' meses';
    f.edad_mental = 'calcular';
    f.grupo_etareo = this.test.grupo_etareo;
    // console.log(f);
    if (this.paramId === 'nuevo') {
      this._wiscService.crearWisc(f)
      .subscribe( resp => {
        swal('Prueba guardada', 'WISC en ' + this.paciente.apellido, 'success' );
      });
    } else {
      f._id = this.paramId;
      this._wiscService.actualizarWisc(f)
      .subscribe(resp => {
        swal('Prueba actualizada', 'WISC en ' + this.paciente.apellido, 'success');
      });
    }
  }

  armarFecha() {
    const  fecha = this.fechaEvaluacion;
    const anio = fecha.getFullYear();
    const month = (fecha.getMonth() + 1).toString();
    const dia = fecha.getDate();
    let mes = '';
    if (month.length === 1) {
      mes = '0' + month;
    } else {
      mes = month;
    }
    return anio + '-' + mes + '-' + dia;
  }


}
