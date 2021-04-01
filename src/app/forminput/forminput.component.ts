import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { FormControl, FormGroup } from "@Angular/forms";
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import {formatDate } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-forminput',
  templateUrl: './forminput.component.html',
  styleUrls: ['./forminput.component.css']
})
export class ForminputComponent implements OnInit {
  myArray: any[] = [];
  docs: any[] = [];
  values = '';
  public show:boolean = true;
  form = new FormGroup({
    newValue: new FormControl('')
  })
  today= new Date();
  jstoday : string;

  constructor(private firestore: AngularFirestore) {
    this.jstoday = formatDate(this.today, 'dd-MM-yyyy hh',  'en-US');
  }
  // checkboxValue: boolean = false;

  ngOnInit(): void {
    
  
  }
  onSubmit(prenom:string, mynom:string, table:string, classe:string) {
    // this.values = value ;

    var myvar = {};
    myvar[mynom] = table;
      this.firestore.collection("MarcelleParde").doc(this.jstoday).collection(table).add({
      nom:mynom,
      prenom:prenom,
      classe:classe
  })

    this.firestore.collection("MarcelleParde").doc(this.jstoday).set(myvar, { merge: true })
  
    .then(res => {
        console.log(res);
        this.form.reset();
    })
    .catch(e => {
        console.log(e);
    })
}
hideQuestions(){
  this.show = !this.show;

}

}
