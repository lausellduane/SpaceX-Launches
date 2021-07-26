import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs-compat/Observable";
import {HttpClient} from "@angular/common/http";


let gridHeaders = [
  {name: "Presskit", cols: 1},
  {name: "Rocket Name", cols: 1},
  {name: "Details", cols: 3},
  {name: "Flight Number", cols: 1},
  {name: "Date (UTC)", cols: 1},
  {name: "id", cols: 1}
  ]

@Component({
  selector: 'app-launch-list',
  templateUrl: './launch-list.component.html',
  styleUrls: ['./launch-list.component.css']
})
export class LaunchListComponent {
  headers = gridHeaders;
  response: any = {};
  gridData: any = [];
  limit: number = 10;
  page: number = 1;
  prevPage: number = 0;
  nextPage: number = 2;
  totalPages: number = 0;
  baseUrl: string = "https://api.spacexdata.com/v4/launches/query";


  // Method getGridData receives the api response results and transforms it to grid friendly format
  getGridData(data: []){
    let gridData: any[] = [];
    data.map(obj => {
      for (const [key, value] of Object.entries(obj)) {
        let col = key === 'details' ? 3 : 1; // set grid column size 3 for details and 1 for the rest
        let val = value;
        gridData.push({name: key, text: val, cols: col});
      }
    })
    return {gridData};
  }

  getPrevPage(){
    this.http.post<any>(this.baseUrl, {
      "query": {},
      "options": {
        "page": this.prevPage,
        "limit": this.limit,
        "sort": {
          "date_utc":"asc"
        },
        "select": ["flight_number", "date_utc", "rocket", "details", "links.presskit"],
        "populate": [
          {
            "path": "rocket",
            "select": {
              "name": 1
            }
          }
        ]
      }
    }).subscribe(data => {
      this.response = data;
      this.limit = data.limit;
      this.page = data.page;
      this.prevPage = data.prevPage;
      this.nextPage = data.nextPage;
      this.totalPages = data.totalPages;
      let grid = this.getGridData(data.docs);
      this.gridData = grid.gridData;
    });
  }

  getNextPage(){
    this.http.post<any>(this.baseUrl, {
      "query": {},
      "options": {
        "page": this.nextPage,
        "limit": this.limit,
        "sort": {
          "date_utc":"asc"
        },
        "select": ["flight_number", "date_utc", "rocket", "details", "links.presskit"],
        "populate": [
          {
            "path": "rocket",
            "select": {
              "name": 1
            }
          }
        ]
      }
    }).subscribe(data => {
      this.response = data;
      this.limit = data.limit;
      this.page = data.page;
      this.prevPage = data.prevPage;
      this.nextPage = data.nextPage;
      this.totalPages = data.totalPages;
      let grid = this.getGridData(data.docs);
      this.gridData = grid.gridData;
    });
  }

  selectLimit(newLimitValue: any){
    this.limit = newLimitValue.value
    this.http.post<any>(this.baseUrl, {
      "query": {},
      "options": {
        "page": this.page,
        "limit": this.limit,
        "sort": {
          "date_utc":"asc"
        },
        "select": ["flight_number", "date_utc", "rocket", "details", "links.presskit"],
        "populate": [
          {
            "path": "rocket",
            "select": {
              "name": 1
            }
          }
        ]
      }
    }).subscribe(data => {
      this.response = data;
      this.limit = data.limit;
      this.page = data.page;
      this.prevPage = data.prevPage;
      this.nextPage = data.nextPage;
      this.totalPages = data.totalPages;
      let grid = this.getGridData(data.docs);
      this.gridData = grid.gridData;
    });
  }

  selectPage(newPageValue: any){
    this.page = newPageValue.target.value
    this.http.post<any>(this.baseUrl, {
      "query": {},
      "options": {
        "page": this.page,
        "limit": this.limit,
        "sort": {
          "date_utc":"asc"
        },
        "select": ["flight_number", "date_utc", "rocket", "details", "links.presskit"],
        "populate": [
          {
            "path": "rocket",
            "select": {
              "name": 1
            }
          }
        ]
      }
    }).subscribe(data => {
      this.response = data;
      this.limit = data.limit;
      this.page = data.page;
      this.prevPage = data.prevPage;
      this.nextPage = data.nextPage;
      this.totalPages = data.totalPages;
      let grid = this.getGridData(data.docs);
      this.gridData = grid.gridData;
    });
  }



  constructor(private http: HttpClient) {
    this.gridData = [];
  }



  ngOnInit() {
    this.http.post<any>(this.baseUrl, {
      "query": {},
      "options": {
        "page": this.page,
        "limit": this.limit,
        "sort": {
          "date_utc":"asc"
        },
        "select": ["flight_number", "date_utc", "rocket", "details", "links.presskit"],
        "populate": [
          {
            "path": "rocket",
            "select": {
                "name": 1
            }
          }
        ]
      }
    }).subscribe(data => {
      this.response = data;
      this.limit = data.limit;
      this.page = data.page;
      this.prevPage = data.prevPage;
      this.nextPage = data.nextPage;
      this.totalPages = data.totalPages;
      let grid = this.getGridData(data.docs);
      this.gridData = grid.gridData;
    });
  }
}
