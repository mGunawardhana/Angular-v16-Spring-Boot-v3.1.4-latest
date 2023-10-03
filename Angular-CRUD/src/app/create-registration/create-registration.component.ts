import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ApiService} from "../service/api.service";
import {NgToastService} from "ng-angular-popup";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../models/user.model";

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.scss'],
})
export class CreateRegistrationComponent implements OnInit {
  public packages = ['Monthly', 'Quarterly', 'Yearly'];
  public genders = ['Male', 'Female'];
  public importantList: string[] = ['Toxic Fat reduction', 'Energy and Endurance', 'Building lean Muscle', 'Heal-their Digestive System', 'Sugar Craving Body', 'Fitness',];

  public registerForm!: FormGroup;
  public userIdToUpdate!: number;
  public isUpdateActive: boolean = false;

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router, private toastService: NgToastService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      id: [''],
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      weight: [''],
      height: [''],
      bmi: [''],
      bmiResult: [''],
      gender: [''],
      requireTrainer: [''],
      packageName: [''],
      important: [''],
      haveGymBefore: [''],
      enquiryDate: [''],
    });
    this.registerForm.controls['height'].valueChanges.subscribe(res => {
      this.calculateBmi(res);
    });
    this.activatedRoute.params.subscribe(value => {
      this.userIdToUpdate = value['id'];
      this.api.getRegisteredUserById(this.userIdToUpdate).subscribe(res => {
        this.isUpdateActive = true;
        this.fillFormToUpdate(res);
      })
    })
  }

  clickedSubmitBtn() {
    this.api.postRegistration(this.registerForm.value).subscribe(res => {
      this.toastService.success({
        detail: "SUCCESS!", summary: "user saved successfully!", duration: 3000,
      });
      this.registerForm.reset();
    })
  }

  update() {
    this.api.updateRegisteredUser(this.registerForm.value).subscribe(res => {
      this.toastService.success({
        detail: "SUCCESS!", summary: "user updates successfully!", duration: 3000,
      });
      this.registerForm.reset();
      this.router.navigate(['list']).then(r => {
        console.log("Navigate Success!")
      });
    })
  }

  calculateBmi(value: number) {
    const weight = this.registerForm.value.weight;
    const height = value;
    const bmi = weight / (height * height);
    let bmiResult = "";
    this.registerForm.controls['bmi'].patchValue(bmi);
    switch (true) {
      case bmi < 18.5:
        this.registerForm.controls['bmiResult'].patchValue("Underweight");
        break;
      case (bmi >= 18.5 && bmi < 25):
        this.registerForm.controls['bmiResult'].patchValue("Normal");
        break;
      case (bmi >= 25 && bmi < 30):
        this.registerForm.controls['bmiResult'].patchValue("Overweight");
        break;
      default:
        this.registerForm.controls['bmiResult'].patchValue("Obese");
        break;
    }
  }

  fillFormToUpdate(user: User) {
    this.registerForm.setValue({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
      weight: user.weight,
      height: user.height,
      bmi: user.bmi,
      bmiResult: user.bmiResult,
      gender: user.gender,
      requireTrainer: user.requireTrainer,
      packageName: user.packageName,
      important: user.important,
      haveGymBefore: user.haveGymBefore,
      enquiryDate: user.enquiryDate
    })
  }

}
