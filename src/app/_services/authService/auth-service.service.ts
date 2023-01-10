import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    // Appelez l'API de connexion ici en envoyant l'adresse email et le mot de passe
    // et en retournant une promesse qui résout avec les informations de l'utilisateur en cas de succès
    // ou qui rejette avec une erreur en cas d'échec
    return this.http.post<any>('/login', { email, password }).toPromise();
  }

  logout() {
    // Déconnectez l'utilisateur ici, par exemple en supprimant les informations de connexion du navigateur
  }
}