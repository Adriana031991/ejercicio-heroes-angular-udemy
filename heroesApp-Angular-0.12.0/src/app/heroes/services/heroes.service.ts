import { Heroe } from './../interfaces/heroe.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

// const URI = 'http://localhost:3000'

@Injectable({
  providedIn: 'root'
})

export class HeroesService {

private URI: string = environment.uri

  constructor( private http: HttpClient) { }


  getHeroes():Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${this.URI}/heroes`)
  }

  getHeroePorId( id : string ):Observable<Heroe> {
    return this.http.get<Heroe>(`${this.URI}/heroes/${id}`)
  }

  getSugerencias( termino: String ):Observable<Heroe[]>{
    return this.http.get<Heroe[]>(`${this.URI}/heroes/?q=${ termino }&limit=6`)
  }

  agregarHeroe( heroe: Heroe):Observable<Heroe> {
    return this.http.post<Heroe>(`${this.URI}/heroes`, heroe);
  }

  actualizarHeroe( heroe: Heroe):Observable<Heroe> {
    return this.http.put<Heroe>(`${this.URI}/heroes/${heroe.id}`, heroe);
  }

  borrarHeroe( id: string):Observable<any> {
    return this.http.delete<any>(`${this.URI}/heroes/${id}`);
  }
}
