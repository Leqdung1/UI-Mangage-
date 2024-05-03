import { Component, inject } from '@angular/core';
import { IPeople } from '../../interface/people';
import { HttpService } from '../../http.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { SelectionModel } from '@angular/cdk/collections';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-people-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink, MatCheckboxModule, MatCardModule, MatIconModule, CommonModule],
  templateUrl: './people-list.component.html',
  styleUrl: './people-list.component.css'
})
export class PeopleListComponent {
  peopleList: IPeople[] = [];
  selection = new SelectionModel<IPeople>(true, []); 
  currentPage = 1;
  pageSize = 8;
  totalPages = this.currentPage;
  httpService = inject(HttpService);
  router = inject(Router)
  displayedColumns: string[] = ['selection', 'id', 'name', 'dob', 'action'];
  dataSource: MatTableDataSource<IPeople>;

  constructor() {
    this.dataSource = new MatTableDataSource<IPeople>([]);
  }

  ngOnInit() {
    this.loadPeople().catch((e) => {
      console.log(e);
    })
  }

  async loadPeople() {
    const offset = (this.currentPage - 1) * this.pageSize;
    this.httpService.getAllPeople(offset, this.pageSize, this.currentPage).subscribe({
      next: (v) => {
        this.dataSource = new MatTableDataSource(v.people);
        this.totalPages = Number(v.totalPages); 
        console.log('Data received', v);
      },
      error: (e) =>{
        console.error(e)
      }
     })
  }
  
  edit(id: number) {
    console.log(id);
    this.router.navigateByUrl("/people/" + id);
  }

  // delete by id 
  delete(id: number) {
    this.httpService.deleteByPeopleId(id).subscribe(() => {
      console.log("Success");
      this.peopleList = this.peopleList.filter(x => x.id != id);
    });
  }

  // delete by check box
  deleteIds() {
    const selectedIds = this.selection.selected.map(item => item.id); // Gather selected IDs
    if (selectedIds.length > 0) {
      this.httpService.deleteByIds(selectedIds).subscribe(() => {
        console.log("Deleted successfully");
        this.loadPeople(); // Refresh the list of people after deletion
      });
    } else {
      console.log("No items selected to delete.");
    }
  }

  // Delete All the API (but dont use anymore) :>
  deleteAll() {
    this.httpService.deleteAllPeople().subscribe(() => {
      console.log("deleted successfully");
      this.peopleList = [];
    });
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
}

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: IPeople): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${this.peopleList.indexOf(row) + 1}`;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
}

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPeople();
    }
  }
  
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
       this.loadPeople();
    }
  }
}
