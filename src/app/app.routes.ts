import { Routes } from '@angular/router';
import { PeopleListComponent } from './components/people-list/people-list.component';
import { PeopleFormComponent } from './components/people-form/people-form.component';

export const routes: Routes = [
    {
        path:"",
        component: PeopleListComponent
    },
    {
        path:"people-list",
        component: PeopleListComponent
    },
    {
        path:"create-people",
        component: PeopleFormComponent
    },
    {
        path:"people/:id",
        component: PeopleFormComponent
    }
];
