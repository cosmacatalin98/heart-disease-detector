import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Statistics } from "./statistics";

@Injectable()
export class AccuracyService {
  private getAccuracyURL = "http://127.0.0.1:5002/getAccuracy";

  constructor(private http: HttpClient) { }

  getAccuracy(): Observable<Statistics> {
    return this.http.get<Statistics>(this.getAccuracyURL);
  }
}
