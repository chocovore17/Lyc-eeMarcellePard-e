import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { FormControl, FormGroup } from "@Angular/forms";
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import {formatDate } from '@angular/common';

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
  today= new Date();
  jstoday = '';

  constructor(private firestore: AngularFirestore) {
    this.jstoday = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a',  'en-US');
  }
  checkboxValue: boolean = false;

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
  onSubmit(prenom:string, mynom:string, table:string, classe:string, message:string) {
    // this.values = value ;
    
    this.firestore.collection(classe).doc(mynom+", "+prenom).update({
      // table:table, 
      pensionnaire:this.checkboxValue
      // date : this.jstoday
  })
    this.firestore.collection(classe).doc(mynom+", "+prenom).collection(this.jstoday).add({
      table:table,
      symptômes:message
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
