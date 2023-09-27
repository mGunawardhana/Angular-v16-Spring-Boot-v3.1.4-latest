import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../models/user.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ApiService} from "../service/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.scss']
})
export class RegistrationListComponent implements OnInit {
  public users!: User[];
  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'mobile', 'bmiResult', 'gender', 'package', 'enquiryDate', 'action'];

  constructor(private api: ApiService,private router:Router) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.api.getRegisteredUser().subscribe(res => {
      this.users = res;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(res)
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

  }
}
