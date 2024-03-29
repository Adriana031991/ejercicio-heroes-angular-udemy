import { Heroe } from './../interfaces/heroe.interface';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagen',
  pure: false,
})
export class ImagenPipe implements PipeTransform {

  transform( heroe: Heroe): String {

    if( !heroe.id && !heroe.alt_img){
      return `../assets/no-image.png`;
    } else if(heroe.alt_img) {
      return heroe.alt_img;
    }else {
      return `../assets/heroes/${heroe.id}.jpg`;
    }

  }

}
