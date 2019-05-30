import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class GetReportsNameService
{
    constructor(private httpclient:HttpClient)
    {

    }
    getData():Observable<any>{
        return this.httpclient.get("http://localhost:49189/api/Configuration");
    }

}