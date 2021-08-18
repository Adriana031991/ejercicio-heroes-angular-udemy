import { Heroe } from './../interfaces/heroe.interface';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( heroe: Heroe): String {
    return `../assets/heroes/${heroe.id}.jpg`;
  }

}
