import { Component, inject } from '@angular/core';
import { IPeople } from '../../interface/people';
import { HttpService } from '../../http.service';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-people-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink, MatCheckboxModule],
  templateUrl: './people-list.component.html',
  styleUrl: './people-list.component.css'
})
export class PeopleListComponent {
  peopleList:IPeople[]=[];

  httpService=inject(HttpService);

  router = inject(Router)

  displayedColumns: string[] = ['id', 'name', 'dob', 'action'];

  ngOnInit(){
    this.httpService.getAllPeople().subscribe((result) => {
    this.peopleList = result;
    console.log(this.peopleList);
  });
  }

  edit(id: number) {
    console.log(id);
    this.router.navigateByUrl("/people/" + id);
  }

  delete(id: number) {
    this.httpService.deleteByPeopleId(id).subscribe(() => {
      console.log("Success");
      this.peopleList = this.peopleList.filter(x => x.id!=id);
  });
  }

  deleteIds(){
    this.httpService.deleteByIds().subscribe(() => {
      console.log("delete successfully");
      this.peopleList = [];
    })
  }

  deleteAll() {
    this.httpService.deletePeople().subscribe(() => 
    {
      console.log("deleted successfully");
      this.peopleList = [];
    });
}
}


