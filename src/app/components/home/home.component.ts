import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Package } from 'src/app/models/package';
import { PackageService } from 'src/app/services/package.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  cvColumnsTable = [
    'id',
    'nameTurist',
    'dniTurist',
    'costTravel',
    'monthsFinancing',
    'cuota',
  ];

  cvDataSource = new MatTableDataSource<Package>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.cvDataSource.paginator = this.paginator;
  }

  constructor(private packageService: PackageService) {}

  ngOnInit() {
    this.getDataPackages();
  }

  getDataPackages(): void {
    this.packageService.getPackages().subscribe({
      next: (data: Package[]) => {
        this.cvDataSource = new MatTableDataSource(data);
        this.cvDataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  totalInterest(cost: number, months: number): number {
    return cost * 0.01 * months;
  }

  calculateCuota(cost: number, months: number): number {
    return Math.floor(
      (cost + this.totalInterest((cost = cost), (months = months))) / months
    );
  }
}
