import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  termino: String = "";
  heroes: Heroe[] = [];
  heroeSeleccionado:Heroe | undefined;

  constructor( private heroService: HeroesService) { }

  ngOnInit(): void {
  }

  buscando() {
    this.heroService.getSugerencias(this.termino.trim()).subscribe(heroes => {this.heroes = heroes})
  }

  optionSeleccionada( event: MatAutocompleteSelectedEvent ) : void {

    if(!event.option.value){
      this.heroeSeleccionado = undefined;
      return;
    }

    const heroe: Heroe = event.option.value; //traigo la informacion del heroe a partir del event
    this.termino = heroe.superhero; // para que el termino sea igual al nombre del superheroe y quede en el espacio de busqueda
    this.heroService.getHeroePorId( heroe.id! ) //le coloco el ! para indicarle que siempre va a llegar un dato tipo Heroe
    .subscribe( heroe => {this.heroeSeleccionado = heroe});
  }

}
