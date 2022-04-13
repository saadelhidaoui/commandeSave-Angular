import { Injectable } from '@angular/core';
import { Commande } from "../model/commande.model";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  private _commande!: Commande;
  private _commandes!: Array<Commande>;
  private _index!: number;
  private urlBase = 'http://localhost:8080';
  private  url = '/stock/commande';

  public update(index: number, commande: Commande) {
    this.commande = this.clone(commande);
  }
  public save(){
    if(this.commande.id == null){
      this.http.post(this.urlBase +this.url+'/',this.commande).subscribe(
        data =>{
          if(data > 0){
            let myClona = this.clone(this._commande);
            this.findAll();
          }else if(data == -1){
            alert('commande existe deja');
          }else if(data == -2){
            alert('Le total paye est superieur au total');
          }
        }
      );
    }else{
      this.commandes[this._index] = this.clone(this.commande);
    }
  }
  constructor(private http:HttpClient) { }

  public findAll(){
    this.http.get<Array<Commande>>(this.urlBase+this.url+'/').subscribe(
      data=>{
          this.commandes = data;
      }, error=>{
          console.log("erreur");
      });
  }
  get commande(): Commande {
    if (this._commande == null){
      this._commande = new Commande();
    }
    return this._commande;
  }

  set commande(value: Commande) {
    this._commande = value;
  }

  set commandes(value: Array<Commande>) {
    this._commandes = value;
  }

  get commandes(): Array<Commande> {
    if (this._commandes == null){
      this._commandes = new Array<Commande>();
    }
    return this._commandes;
  }

  private clone(commande: Commande) {
    let myClone = new  Commande();
    myClone.id = commande.id;
    myClone.ref = commande.ref;
    myClone.total = commande.total;
    myClone.totalPaye = commande.totalPaye;
    return myClone;
  }

}
