import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interface';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = environment.uri;
  private _auth: Auth | undefined;

  get auth(): Auth {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return { ...this._auth! };
    // este get es para obtener la informacion desestructurada de los datos del usuario que viene en la data
  }

  constructor(private http: HttpClient) { }

  loggin() {
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
      .pipe(
        tap(data => this._auth = data),
        tap(data => localStorage.setItem('token', data.id))
        // esto para guardar el id en el localstorage y mantener cierta persistencia
      );
  }

  verificarAutenticacion(): Observable<boolean> {
    if (!localStorage.getItem('token')) {
      return of(false);
    }

    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
      .pipe(
        map(auth => {
          this._auth = auth; //para mantener o no perder la info del usuario al recargar la pagina
          return true;
        })
      )
  }

}
