import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { increment} from '@angular/fire/firestore'

import * as firebase from 'firebase/compat';




@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private afs : AngularFirestore) { }

  loadFeatured() {
    return this.afs.collection('posts', ref => ref.where('isFeatured','==',true).limit(4)).snapshotChanges().pipe(
      map((action) => {
        return action.map((a) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data();
          return {id,data}
        })
      })
    )
  }

  loadLatest() {
    return this.afs.collection('posts', ref => ref.orderBy('createdAt','desc')).snapshotChanges().pipe(
      map((action) => {
        return action.map((a) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data();
          return {id,data}
        })
      })
    )
  }

  loadCategoryPosts(categoryId) {
    return this.afs.collection('posts', ref => ref.where('category.categoryId','==',categoryId).limit(4)).snapshotChanges().pipe(
      map((action) => {
        return action.map((a) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data();
          return {id,data}
        })
      })
    )
  }

  loadOnePost(postId) {
   return this.afs.doc(`posts/${postId}`).valueChanges()
  }

  loadSimilar(catId) {
    return this.afs.collection('posts', ref => ref.where('category.categoryId','==',catId).limit(4)).snapshotChanges().pipe(
      map((action) => {
        return action.map((a) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data();
          return {id,data}
        })
      })
    )
  }
  countViews(postId ){

    const viewsCount = {
      views: increment(1)
    }
    this.afs.doc(`posts/${postId}`).update(viewsCount).then( () => {
      console.log("views count updated successfully..")
    })
  }

 
   
  


}

 


