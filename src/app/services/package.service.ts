import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Package } from '../models/package';

@Injectable({
  providedIn: 'root',
})
export class PackageService {
  cvServer: string = 'http://localhost:3000';
  cvModel: string = 'packages';

  constructor(private http: HttpClient) {}

  getPackages() {
    return this.http.get<Package[]>(this.cvServer + '/' + this.cvModel);
  }

  // Package estaba reservada asi que le cambie de nombre
  addPackage(my_package: Package) {
    return this.http.post<Package>(
      this.cvServer + '/' + this.cvModel,
      my_package
    );
  }
}
