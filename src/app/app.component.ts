import { Component, ElementRef, OnInit, resolveForwardRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Ex7-ReactiveForms';
  myForm: FormGroup;
  submitted: boolean;
  nameInput;

  project: {
    name: '',
    email: '',
    status: ''
  }



  onSubmit(){
    this.project = {
      name: this.myForm.value.name,
      email: this.myForm.value.email,
      status: this.myForm.value.status
    }
    
    this.submitted=true;
    console.log(this.myForm)
  }

  ngOnInit(): void {
   this.myForm = new FormGroup({
    'name': new FormControl(null, [Validators.required, this.isTestName], this.checkLength),
    'email': new FormControl(null, Validators.required),
    'status': new FormControl('Stable')
   }) 

   this.submitted= false;

   this.nameInput = this.myForm.get('name');
  }

  // custom validators
  isTestName(form: FormControl): {[s: string]: boolean }{

    let name = (typeof(form.value)=='string')? form.value.toLowerCase() : form.value;
    if(name == 'test'){
      console.log('value cannot be test')
      return {'isNameTest': true};
    } else{
      return null;
    }
  }

  checkLength(form: FormControl): Promise<any>{
    const promise = new Promise<any>((resolve, reject)=>{
      setTimeout(()=>{
        if(form.value!=null && form.value.length < 4){
          resolve({'isTooShort': true})
        } else{
          resolve(null)
        }
      },1500)
    })

    return promise;
  }
}
