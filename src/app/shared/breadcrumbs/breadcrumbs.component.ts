import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, tap, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  label = '';
  metaTag: MetaDefinition;

  constructor( private router: Router,
               public title: Title,
               public meta: Meta ) {

      this.getDataRoute()
        .subscribe( data => {
          // console.log (data);
          this.label = data.titulo;
          this.title.setTitle (this.label);

          if ( data.description === undefined ) {
            this.metaTag = {
              name: 'description',
              content: data.titulo
            };
          } else {
            this.metaTag = {
              name: 'description',
              content: data.description
            };
          }
          this.meta.updateTag( this.metaTag );

        });

  }

  ngOnInit() {
  }

  // Esto se podría poner en un servicio
  getDataRoute() {
    return this.router.events
      .pipe(
        // filtro el evento ActivationEnd
        filter(evento => evento instanceof ActivationEnd ),
        // solo para este caso nos interesa que el firstChild sea null. Ese es el que buscamos
        filter((evento: ActivationEnd) => evento.snapshot.firstChild === null ),
        map( evento => evento.snapshot.data)
      );
  }

}
