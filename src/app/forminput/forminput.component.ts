import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { FormControl, FormGroup } from "@Angular/forms";
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

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
    this.firestore.collection(classe).doc(mynom+", "+prenom).set({
        table:table, 
        symptômes:message, 
        pensionnaire:this.checkboxValue
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
