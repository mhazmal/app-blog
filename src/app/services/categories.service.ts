import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private afs : AngularFirestore) { }

  loadData() {
    return this.afs.collection('categories').snapshotChanges().pipe(
      map((action) => {
        return action.map((a) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data();
          return {id,data}
        })
      })
    )
  }
}