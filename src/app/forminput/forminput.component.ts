import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { FormControl, FormGroup } from "@Angular/forms";

@Component({
  selector: 'app-forminput',
  templateUrl: './forminput.component.html',
  styleUrls: ['./forminput.component.css']
})
export class ForminputComponent implements OnInit {
  myArray: any[] = [];
  docs: any[] = [];
  values = '';
  form = new FormGroup({
    newValue: new FormControl('')
  })

  constructor(private firestore: AngularFirestore) {}
  ngOnInit(): void {
    
    this.firestore
  .collection("Secondes")
  .get()
  .subscribe((ss) => {
    ss.docs.forEach((doc) => {
      this.myArray.push(doc.data());
    });
  });
  
  }
  onSubmit(value:string) {
    this.values = value ;
    this.firestore.collection('Secondes').add({
        field: this.values
    })
    .then(res => {
        console.log(res);
        this.form.reset();
    })
    .catch(e => {
        console.log(e);
    })
}
  

}
