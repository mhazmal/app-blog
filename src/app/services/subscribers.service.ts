import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  constructor(private afs : AngularFirestore) { }

  addSubs( subData ) {
    this.afs.collection('subscribers').add(subData).then( (val) => {
      console.log('subscribed succesfully')
    })
  }

  checkSubs( subEmail) {
   return this.afs.collection('subscribers', ref => ref.where('email','==',subEmail)).get()
  }
  
  

}
