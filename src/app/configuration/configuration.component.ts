import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
 isSearchClicked=false;
  constructor(private httpClient: HttpClient) { }
  columnDefs: ColDef[] = [
    { field: 'id', width: 32,maxWidth:90, filter:true,editable:true },
    { field: 'name', width: 38,filter:true,editable:true },
    { field: 'country', width: 38,filter:true,editable:true },
    { field: 'established', width: 38,filter:true,editable:true },
    { field: 'website', width: 38,filter:true,editable:true },
    { field: 'logo', width: 38,maxWidth:200,filter:true,editable:true },
    { field: 'head_quaters', width: 38,filter:true,editable:true }
  ];

  rowData = [];
  ngOnInit() {

  }
  loadData() {
    let headers = new HttpHeaders();
    headers.set('Access-Control-Allow-Headers', 'Content-Type');
    headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    headers.set('Access-Control-Allow-Origin', '*');
    //  : Content-Type, X-Requested-With, X-authentication, X-client
    // http://dummy.restapiexample.com/api/v1/employees
    const path = 'https://api.instantwebtools.net/v1/passenger?page=0&size=50'
    this.httpClient.get(path).subscribe((rec: any) => {
      console.table(rec);

      const data = [];
      rec.data.forEach(element => {
        data.push(element.airline[0]);
      });
      this.rowData = data;
      this.isSearchClicked=false;
      console.table(data);
    })
  }
  onGridReady(event) {
    console.log('onGridReady executed');
    // event.columnApi.autoSizeAllColumns();
    event.api.sizeColumnsToFit();
  }
  navigate() {
    this.isSearchClicked=true;
    this.rowData = [];
    this.loadData();

  }
}