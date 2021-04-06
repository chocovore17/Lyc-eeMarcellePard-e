import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { FormControl, FormGroup } from "@Angular/forms";
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import {formatDate } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-forminput',
  templateUrl: './forminput.component.html',
  styleUrls: ['./forminput.component.css']
})
export class ForminputComponent implements OnInit {
  myArray: any[] = [];
  docs: any[] = [];
  values = '';
  indeterminate = false;
  public show:boolean = true;
  form = new FormGroup({
    newValue: new FormControl('')
  })
  today= new Date();
  jstoday : string;

  constructor(private firestore: AngularFirestore) {
    this.jstoday = formatDate(this.today, 'dd-MM-yyyy',  'en-US');
  }
  // checkboxValue: boolean = false;

  ngOnInit(): void {
    
  
  }
  
  toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  onSubmit(prenom:string, mynom:string, table:string, classe:string) {
    // this.values = value ;
    prenom = this.toTitleCase(prenom);
    mynom = this.toTitleCase(mynom);
    var myvar = {};
    var thestring = mynom+", "+prenom;
    myvar[thestring] = table;
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
