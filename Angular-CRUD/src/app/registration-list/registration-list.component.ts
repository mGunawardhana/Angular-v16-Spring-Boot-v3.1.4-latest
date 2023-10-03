import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../models/user.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ApiService} from "../service/api.service";
import {Router} from "@angular/router";
import {NgConfirmService} from "ng-confirm-box";
import {NgToastService} from "ng-angular-popup";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.scss']
})
export class RegistrationListComponent implements OnInit {

  public getJsonValue: any;
  public dataSource: any = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'mobile', 'bmiResult', 'gender', 'package', 'enquiryDate', 'action'];

  constructor(private api: ApiService, private router: Router, private confirm: NgConfirmService, private toastService: NgToastService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getMethod();
  }

  public getMethod() {
    this.api.getRegisteredUser().subscribe((data) => {
      console.table(data);
      this.getJsonValue = data;
      this.dataSource = data;
      console.log(this.getJsonValue)
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  edit(id: number) {
    this.router.navigate(['update', id]);
  }

  deleteUser(id: number) {
    this.confirm.showConfirm("Are you sure want to Delete?", () => {
      this.api.deleteRegisteredUser(id)
        .subscribe({
          next: (res) => {
            this.toastService.success({detail: 'SUCCESS', summary: 'Deleted Successfully', duration: 3000});
            this.getMethod();
          }, error: (err) => {
            this.toastService.error({detail: 'ERROR', summary: 'Something went wrong!', duration: 3000});
          }
        })
    }, () => {
    })

  }
}
