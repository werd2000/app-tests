import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GrupoEtareoService {

  grupos = [
    {valor: '1', min: 6.0, max: 6.3},
    {valor: '2', min: 6.4, max: 6.8},
    {valor: '3', min: 6.9, max: 6.11},
    {valor: '4', min: 7.0, max: 7.3},
    {valor: '5', min: 7.4, max: 7.8},
    {valor: '6', min: 7.9, max: 7.11},
    {valor: '7', min: 8.0, max: 8.3},
    {valor: '8', min: 8.4, max: 8.8},
    {valor: '9', min: 8.9, max: 8.11},
    {valor: '10', min: 9.0, max: 9.3},
    {valor: '11', min: 9.4, max: 9.8},
    {valor: '12', min: 9.9, max: 9.11},
    {valor: '13', min: 10.0, max: 10.3},
    {valor: '14', min: 10.4, max: 10.8},
    {valor: '15', min: 10.9, max: 10.11},
    {valor: '16', min: 11.0, max: 11.3},
    {valor: '17', min: 11.4, max: 11.8},
    {valor: '18', min: 11.9, max: 11.11},
    {valor: '19', min: 12.0, max: 12.3},
    {valor: '20', min: 12.4, max: 12.8},
    {valor: '21', min: 12.9, max: 12.11},
    {valor: '22', min: 13.0, max: 13.3},
    {valor: '23', min: 13.4, max: 13.8},
    {valor: '24', min: 13.9, max: 13.11},
    {valor: '25', min: 14.0, max: 14.3},
    {valor: '26', min: 14.4, max: 14.7},
    {valor: '27', min: 14.8, max: 14.11},
    {valor: '28', min: 15.0, max: 15.3},
    {valor: '29', min: 15.4, max: 15.7},
    {valor: '30', min: 15.8, max: 15.11},
    {valor: '31', min: 16.0, max: 16.3},
    {valor: '32', min: 16.4, max: 16.7},
    {valor: '33', min: 16.8, max: 16.11},
  ];

  constructor() { }

  buscarGrupo(edad) {
    for (const grup of this.grupos) {
      if ( edad >= grup.min && edad <= grup.max) {
        return grup.valor;
      }
    }
  }
}
