import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Package } from 'src/app/models/package';
import { PackageService } from 'src/app/services/package.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent {
  cvForm!: FormGroup;
  cvId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private packageService: PackageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.generateReactiveForm();
  }

  generateReactiveForm(): void {
    this.cvForm = this.formBuilder.group({
      id: [''],
      // Es nombre completo, por eso le pongo 100 the length
      nameTurist: ['', [Validators.required, Validators.maxLength(100)]],
      dniTurist: ['', [Validators.required, Validators.maxLength(8)]],
      costTravel: ['', [Validators.required]],
      monthsFinancing: ['', [Validators.required]],
    });
    this.cvId = 0;
  }

  addPackage(): void {
    // Otra vez esta reservado el usar package
    const my_package: Package = {
      cvId: this.cvForm.get('id')!.value,
      cvNameTurist: this.cvForm.get('nameTurist')!.value,
      cvDniTurist: this.cvForm.get('dniTurist')!.value,
      cvCostTravel: parseFloat(this.cvForm.get('costTravel')!.value),
      cvMonthsFinancing: parseInt(this.cvForm.get('monthsFinancing')!.value),
    };
    if (this.cvId != undefined) {
      this.packageService.addPackage(my_package).subscribe({
        next: () => {
          this.router.navigate(['']);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }

    this.router.navigate(['']);
  }

  onCancel() {
    this.router.navigate(['']);
  }
}
