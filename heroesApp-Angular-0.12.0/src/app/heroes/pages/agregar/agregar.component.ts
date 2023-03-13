import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
import { Heroe, Publisher } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
  img {width: 100%; border-radius: 10px;}`
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [{
    id: 'DC Comics',
    desc: 'DC - Comics'
  }];

  heroe: Heroe = {
    alter_ego: '',
    characters: '',
    first_appearance: '',
    superhero: '',
    publisher: Publisher.DCComics
  };

  constructor(private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit(): void {

    if (!this.router.url.includes('editar')) {
      return;
    }

    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.getHeroePorId(id)))
      // este observable retorna un heroe no un id
      .subscribe(heroe => this.heroe = heroe);
  }

  guardar() {
    if (this.heroe.superhero.trim().length === 0) { return; }

    if (this.heroe.id) {
      this.heroesService.actualizarHeroe(this.heroe).subscribe(heroe => {
        this.mostrarSnackBar('Registro Actualizado'),
        console.log('actualizando', heroe)
      });
    } else {
      this.heroesService.agregarHeroe(this.heroe).subscribe(heroe => this.router.navigate(['/heroes/editar', heroe.id]));
      this.mostrarSnackBar('Registro Creado')

    }

  }

  borrar() {

    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '250px',
      data: { ...this.heroe }
    });

    dialog.afterClosed().subscribe(
      result => {
        if (result) {
          this.heroesService.borrarHeroe(this.heroe.id!).subscribe(resp => this.router.navigate(['/heroes']));

        }
      }
    )

  }

  mostrarSnackBar(mensaje: string) {
    this.snackBar.open(mensaje, 'Ok!', {
      duration: 2000,
    });

  }
}
