import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable, of} from 'rxjs'
import {map} from 'rxjs/operators'
import {Router} from '@angular/router'
import { ComponentLoaderService } from './componentLoader.service'

export interface UserDetails {
   id: number
   first_name: string
   last_name: string
   email: string
   password: string
   exp: number
   iat: number
   uid: number
}

interface TokenResponse{
   token: string
}

export interface TokenPayload{
   id: number
   first_name: string
   last_name: string
   email: string
   password: string

}

@Injectable()
export class AuthenticationService{
   private token: string

   constructor(private http: HttpClient, private router: Router, private loaderService: ComponentLoaderService)
   {

   }

   private saveToken(token: string): void {
      localStorage.setItem('usertoken', token)
               console.log(token)
      this.token = token
   }

   private getToken(): string {
      if(!this.token)
      {
         this.token = localStorage.getItem('usertoken')
         console.log(this.token)
      }
      return this.token
   }

   public getUserDetails(): UserDetails {
      const token = this.getToken()
      let payload 
      if(token)
      {
         payload = token.split('.')[1]
         payload = window.atob(payload)
         return JSON.parse(payload)
      }
      else
      {
         return null
      }
   }

   public isLoggedIn(): boolean {
      const user = this.getUserDetails()
      if(user)
      {
         return user.exp > Date.now() / 1000
      }
      else
      {
         return false
      }
   }

   public register(user: TokenPayload): Observable<any>{
      return this.http.post(`http://localhost:3000/api/users/register`, user)
   }

   public login(user: TokenPayload): Observable<any>{
      const base = this.http.post(`http://localhost:3000/api/users/login`, user)

      const request = base.pipe(
         map((data: TokenResponse) => {
            if(data.token){
               console.log('token: ' + data.token)
               this.saveToken(data.token)
            }
            return data
         })
      )
      return request
   }

   public profile(id): Observable<any>{
      return this.http.get(`http://localhost:3000/api/users/getuser/${id}`,
      {
         headers: { Authorization: `${this.getToken()}`}
      })
   }

   public logout(): void{
      this.token = ''
      window.localStorage.removeItem('usertoken')
      this.loaderService.loadComponent("Empty")
      this.router.navigateByUrl('/')
   }
}