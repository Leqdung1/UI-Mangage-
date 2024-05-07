export interface IPeople{
    id: number;
    name: string;
    dob: string;
}

export interface PeopleList{
    currentPage: number;
    pageSize: number;
    people: IPeople[];
    totalItems: number;
    totalPages: number;
}
