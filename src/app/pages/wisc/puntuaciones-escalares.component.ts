import { Component, OnInit } from '@angular/core';
import { PuntuacionesEscalares } from 'src/app/models/puntuacionesEscalares';

@Component({
  selector: 'app-puntuaciones-escalares',
  templateUrl: './puntuaciones-escalares.component.html',
  styles: []
})
export class PuntuacionesEscalaresComponent implements OnInit {

  pe: PuntuacionesEscalares;

  constructor() { }

  ngOnInit() {
    this.pe = new PuntuacionesEscalares();
  }

  guardarPuntuacionesEscalares(f) {
    console.log(f);
  }

  calcularDc(event) {
    // Miro en la tabla y obtengo la puntuación escalar ej: 9
    let valorEscalar;
    if (event.target.value === '') {
      valorEscalar = '';
    } else {
      valorEscalar = 9;
    }
    this.pe.dc_puntajenatural = valorEscalar;
    this.pe.dc_rp = valorEscalar;
    this.pe.dc_total = valorEscalar;
  }

  calcularCd(event) {
    // Miro en la tabla y obtengo la puntuación escalar ej: 9
    let valorEscalar;
    if (event.target.value === '') {
      valorEscalar = '';
    } else {
      valorEscalar = 9;
    }
    this.pe.cd_puntajenatural = valorEscalar;
    this.pe.cd_rp = valorEscalar;
    this.pe.cd_total = valorEscalar;
  }

  calcularMt(event) {
    // Miro en la tabla y obtengo la puntuación escalar ej: 9
    let valorEscalar;
    if (event.target.value === '') {
      valorEscalar = '';
    } else {
      valorEscalar = 9;
    }
    this.pe.mt_puntajenatural = valorEscalar;
    this.pe.mt_rp = valorEscalar;
    this.pe.mt_total = valorEscalar;
  }

  calcularFi(event) {
    // Miro en la tabla y obtengo la puntuación escalar ej: 9
    let valorEscalar;
    if (event.target.value === '') {
      valorEscalar = '';
    } else {
      valorEscalar = 9;
    }
    this.pe.fi_puntajenatural = valorEscalar;
    this.pe.fi_rp = valorEscalar;
    this.pe.fi_total = valorEscalar;
  }

  calcularTotalRp() {
    const dc_rp = parseInt(document.getElementById('dc_rp').value, 10) || 0;
    const cd_rp = parseInt(document.getElementById('cd_rp').value, 10) || 0;
    const mt_rp = parseInt(document.getElementById('mt_rp').value, 10) || 0;
    const fi_rp = parseInt(document.getElementById('fi_rp').value, 10) || 0;
    this.pe.suma_rp = 0;
    if (dc_rp > 0 && cd_rp > 0 && mt_rp > 0) {
      this.pe.suma_rp = dc_rp + cd_rp + mt_rp;
    }
    if (dc_rp > 0 && cd_rp > 0 && mt_rp === 0 && fi_rp > 0) {
      this.pe.suma_rp = dc_rp + cd_rp + fi_rp;
    }
    if (dc_rp > 0 && cd_rp === 0 && mt_rp > 0 && fi_rp > 0) {
      this.pe.suma_rp = dc_rp + mt_rp + fi_rp;
    }
    if (dc_rp === 0 && cd_rp > 0 && mt_rp > 0 && fi_rp > 0) {
      this.pe.suma_rp = mt_rp + cd_rp + fi_rp;
    }
  }

  calcularSe(event) {
    // Miro en la tabla y obtengo la puntuación escalar ej: 9
    let valorEscalar;
    if (event.target.value === '') {
      valorEscalar = '';
    } else {
      valorEscalar = 9;
    }
    this.pe.se_puntajenatural = valorEscalar;
    this.pe.se_cv = valorEscalar;
    this.pe.se_total = valorEscalar;
  }

  calcularVb(event) {
    // Miro en la tabla y obtengo la puntuación escalar ej: 9
    let valorEscalar;
    if (event.target.value === '') {
      valorEscalar = '';
    } else {
      valorEscalar = 9;
    }
    this.pe.vb_puntajenatural = valorEscalar;
    this.pe.vb_cv = valorEscalar;
    this.pe.vb_total = valorEscalar;
  }

  calcularCm(event) {
    // Miro en la tabla y obtengo la puntuación escalar ej: 9
    let valorEscalar;
    if (event.target.value === '') {
      valorEscalar = '';
    } else {
      valorEscalar = 9;
    }
    this.pe.cm_puntajenatural = valorEscalar;
    this.pe.cm_cv = valorEscalar;
    this.pe.cm_total = valorEscalar;
  }

  calcularIn(event) {
    // Miro en la tabla y obtengo la puntuación escalar ej: 9
    let valorEscalar;
    if (event.target.value === '') {
      valorEscalar = '';
    } else {
      valorEscalar = 9;
    }
    this.pe.in_puntajenatural = valorEscalar;
    this.pe.in_cv = valorEscalar;
    this.pe.in_total = valorEscalar;
  }

  calcularPc(event) {
    // Miro en la tabla y obtengo la puntuación escalar ej: 9
    let valorEscalar;
    if (event.target.value === '') {
      valorEscalar = '';
    } else {
      valorEscalar = 9;
    }
    this.pe.pc_puntajenatural = valorEscalar;
    this.pe.pc_cv = valorEscalar;
    this.pe.pc_total = valorEscalar;
  }

  calcularTotalCv() {
    const se_cv = parseInt(document.getElementById('se_cv').value, 10) || 0;
    const vb_cv = parseInt(document.getElementById('vb_cv').value, 10) || 0;
    const cm_cv = parseInt(document.getElementById('cm_cv').value, 10) || 0;
    const in_cv = parseInt(document.getElementById('in_cv').value, 10) || 0;
    const pc_cv = parseInt(document.getElementById('pc_cv').value, 10) || 0;
    this.pe.suma_cv = 0;
    if (se_cv > 0 && vb_cv > 0 && cm_cv > 0) {
      this.pe.suma_cv = se_cv + vb_cv + cm_cv;
    }
    if (se_cv === 0 && vb_cv > 0 && cm_cv > 0 && in_cv > 0 && pc_cv === 0) {
      this.pe.suma_cv = vb_cv + cm_cv + in_cv;
    }
    if (se_cv === 0 && vb_cv > 0 && cm_cv > 0 && in_cv === 0 && pc_cv > 0) {
      this.pe.suma_cv = vb_cv + cm_cv + pc_cv;
    }
    if (se_cv > 0 && vb_cv === 0 && cm_cv > 0 && in_cv > 0 && pc_cv === 0) {
      this.pe.suma_cv = se_cv + cm_cv + in_cv;
    }
    if (se_cv > 0 && vb_cv === 0 && cm_cv > 0 && in_cv === 0 && pc_cv > 0) {
      this.pe.suma_cv = se_cv + cm_cv + pc_cv;
    }
    if (se_cv > 0 && vb_cv > 0 && cm_cv === 0 && in_cv > 0 && pc_cv === 0) {
      this.pe.suma_cv = se_cv + vb_cv + in_cv;
    }
    if (se_cv > 0 && vb_cv > 0 && cm_cv === 0 && in_cv === 0 && pc_cv > 0) {
      this.pe.suma_cv = se_cv + vb_cv + pc_cv;
    }
  }

  calcularRd(event) {
    // Miro en la tabla y obtengo la puntuación escalar ej: 9
    let valorEscalar;
    if (event.target.value === '') {
      valorEscalar = '';
    } else {
      valorEscalar = 9;
    }
    this.pe.rd_puntajenatural = valorEscalar;
    this.pe.rd_mt = valorEscalar;
    this.pe.rd_total = valorEscalar;
  }

  calcularNl(event) {
    // Miro en la tabla y obtengo la puntuación escalar ej: 9
    let valorEscalar;
    if (event.target.value === '') {
      valorEscalar = '';
    } else {
      valorEscalar = 9;
    }
    this.pe.nl_puntajenatural = valorEscalar;
    this.pe.nl_mt = valorEscalar;
    this.pe.nl_total = valorEscalar;
  }

  calcularAr(event) {
    // Miro en la tabla y obtengo la puntuación escalar ej: 9
    let valorEscalar;
    if (event.target.value === '') {
      valorEscalar = '';
    } else {
      valorEscalar = 9;
    }
    this.pe.ar_puntajenatural = valorEscalar;
    this.pe.ar_mt = valorEscalar;
    this.pe.ar_total = valorEscalar;
  }

  calcularTotalMt() {
    const rd_mt = parseInt(document.getElementById('rd_mt').value, 10) || 0;
    const nl_mt = parseInt(document.getElementById('nl_mt').value, 10) || 0;
    const ar_mt = parseInt(document.getElementById('ar_mt').value, 10) || 0;
    this.pe.suma_mt = 0;
    if (rd_mt > 0 && nl_mt > 0) {
      this.pe.suma_mt = rd_mt + nl_mt;
    }
    if (rd_mt === 0 && nl_mt > 0 && ar_mt > 0) {
      this.pe.suma_mt = nl_mt + ar_mt;
    }
    if (rd_mt > 0 && nl_mt === 0 && ar_mt > 0) {
      this.pe.suma_mt = rd_mt + ar_mt;
    }
  }

  calcularCl(event) {
    // Miro en la tabla y obtengo la puntuación escalar ej: 9
    let valorEscalar;
    if (event.target.value === '') {
      valorEscalar = '';
    } else {
      valorEscalar = 9;
    }
    this.pe.cl_puntajenatural = valorEscalar;
    this.pe.cl_vp = valorEscalar;
    this.pe.cl_total = valorEscalar;
  }

  calcularBs(event) {
    // Miro en la tabla y obtengo la puntuación escalar ej: 9
    let valorEscalar;
    if (event.target.value === '') {
      valorEscalar = '';
    } else {
      valorEscalar = 9;
    }
    this.pe.bs_puntajenatural = valorEscalar;
    this.pe.bs_vp = valorEscalar;
    this.pe.bs_total = valorEscalar;
  }

  calcularRg(event) {
    // Miro en la tabla y obtengo la puntuación escalar ej: 9
    let valorEscalar;
    if (event.target.value === '') {
      valorEscalar = '';
    } else {
      valorEscalar = 9;
    }
    this.pe.rg_puntajenatural = valorEscalar;
    this.pe.rg_vp = valorEscalar;
    this.pe.rg_total = valorEscalar;
  }

  calcularTotalVp() {
    const cl_vp = parseInt(document.getElementById('cl_vp').value, 10) || 0;
    const bs_vp = parseInt(document.getElementById('bs_vp').value, 10) || 0;
    const rg_vp = parseInt(document.getElementById('rg_vp').value, 10) || 0;
    this.pe.suma_vp = 0;
    if (cl_vp > 0 && bs_vp > 0) {
      this.pe.suma_vp = cl_vp + bs_vp;
    }
    if (cl_vp === 0 && bs_vp > 0 && rg_vp > 0) {
      this.pe.suma_vp = bs_vp + rg_vp;
    }
    if (cl_vp > 0 && bs_vp === 0 && rg_vp > 0) {
      this.pe.suma_vp = cl_vp + rg_vp;
    }
    this.calcularEscalaTotal();
  }

  calcularEscalaTotal() {
    this.pe.suma_total = this.pe.suma_cv + this.pe.suma_mt + this.pe.suma_rp + this.pe.suma_vp;
  }

}
