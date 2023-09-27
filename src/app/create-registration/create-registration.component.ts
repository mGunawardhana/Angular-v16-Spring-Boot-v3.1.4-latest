import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
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
      package: [''],
      important: [''],
      haveGymBefore: [''],
      enquiryDate: [''],
    });
  }

  printValue() {
    console.log(this.registerForm.value);
  }

  calculateBMI(heightValue: number) {
    const weight = this.registerForm.value.weight;
    const height = this.registerForm.value.height;
    const bmi = weight / (height * height);
    this.registerForm.controls['bmi'].patchValue(bmi);

    switch (bmi != 0) {
      case bmi < 15 :
        this.registerForm.controls['bmiResult'].patchValue("Very severely underweight");
        break;
      case (bmi >= 15 && bmi < 16):
        this.registerForm.controls['bmiResult'].patchValue("Severely underweight");
        break;
      case (bmi >= 16 && bmi < 18.5):
        this.registerForm.controls['bmiResult'].patchValue("Underweight");
        break;
      case (bmi >= 18.5 && bmi < 25):
        this.registerForm.controls['bmiResult'].patchValue("Normal (healthy weight)");
        break;
      case (bmi >= 25 && bmi < 30):
        this.registerForm.controls['bmiResult'].patchValue("Overweight");
        break;
      case (bmi >= 30 && bmi < 35):
        this.registerForm.controls['bmiResult'].patchValue("Moderately obese");
        break;
      case (bmi >= 35 && bmi < 40):
        this.registerForm.controls['bmiResult'].patchValue("Severely obese");
        break;
      case bmi >= 40:
        this.registerForm.controls['bmiResult'].patchValue("Very severely obese");
        break;
      default:
        break;
    }

  }

}
