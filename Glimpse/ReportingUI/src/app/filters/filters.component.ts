import { Component, OnInit, Input } from '@angular/core';
import { ReportName } from '../DTO/ReportName';
import { DLLdata } from '../DTO/DLLdata';
import { PopulateDDLDataService } from '../services/PopulateDDLData.service';
import { GetConfigurationService } from '../services/GetConfiguration.service';
import { Configuration } from '../DTO/Configuration';
import { Dict } from '../DTO/Dict';
import { PARAMETERS } from '@angular/core/src/util/decorators';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
	@Input() report:ReportName;
  listData:DLLdata;
  config: Configuration;
  dlldata: DLLdata[];
  selectedValue:string;
  parameters: Map<string, string>;
  constructor(private _populateddldataservice: PopulateDDLDataService, 
    private _getconfigurationservice: GetConfigurationService) {
      this.parameters = new Map<string, string>();
    }
  ngOnInit() {
  }
  onSelect(event:any): void {
    this.parameters.set(event.target.id, event.target.value)
    console.log(this.parameters.get(event.target.id));
    this.selectedValue=this.parameters.get(event.target.id);
  }
  ngOnChanges(){
    if(this.report != null)
    {
        this._getconfigurationservice.getData(this.report.ReportName)
      .subscribe
      (
        data=>
        {
          this.config=data;
          for(var i = 0;i < this.config.Parameters.length; i++){
            if(this.config.Parameters[i].Type=="string"){
              this.parameters.set(this.config.Parameters[i].Name, this.config.Parameters[i].DefaultValue);
            }
            if(this.config.Parameters[i].Type=="int"){
              this.parameters.set(this.config.Parameters[i].Name, this.config.Parameters[i].DefaultValue);
              if(this.config.Parameters[i].PrePopulate==true){
                this._populateddldataservice.getData(this.config.Parameters[i].StoredProcedureName)
                .subscribe
                (
                  data=>
                  {
                    this.dlldata=data;
                  }
                )
                console.log(this.parameters.get(this.config.Parameters[i].Name));
            }
          }
            if(this.config.Parameters[i].Type=="date"){
              console.log('in date');
              this.parameters.set(this.config.Parameters[i].Name, this.config.Parameters[i].DefaultValue);
            }
          }
        }
      )
    }
  }
}