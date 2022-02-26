import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { City } from 'src/app/models/City';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-teacher-registration',
  templateUrl: './teacher-registration.component.html',
  styleUrls: ['./teacher-registration.component.css']
})

export class TeacherRegistrationComponent implements OnInit {

  firstName?: String;
  lastName?: String; 
  email?: String; 
  phone?: String;
  subject?: String; 
  city?: City;
  notes?: String; 
  cities?: City[];
  kvkkChecked?: boolean; 

  teacherFormGroup!: FormGroup;
  submitted: boolean = false;

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getCities().subscribe(cities => this.cities = cities);
    this.teacherFormGroup = this.formBuilder.group({
      'firstName': new FormControl(null, Validators.required),
      'lastName': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'phone' : new FormControl(
        null,
        [
          Validators.required,
          Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$')
        ]),
      'city': new FormControl(null, Validators.required),
      'notes': new FormControl(null),
      'terms' : new FormControl(null, Validators.required, )

    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.teacherFormGroup.controls;
  }

  onSubmit(): void {
    console.log(this.subject)
    this.submitted = true;
    if (this.teacherFormGroup.invalid) {
      console.log('form invalid')
      return;
    }
    console.log(JSON.stringify(this.teacherFormGroup.value, null, 2));
  }
  onReset(): void {
    this.submitted = false;
    this.teacherFormGroup.reset();
  }
  getCities() : Observable<City[]>{
    return this.httpClient.get<City[]>(`${environment.apiUrl}/api/cities`); 
  }
}
