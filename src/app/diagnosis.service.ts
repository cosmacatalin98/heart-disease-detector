import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Diagnosis } from "./diagnosis";

@Injectable()
export class DiagnosisService {
  private getDiagnosisURL = "http://127.0.0.1:5002/getDiagnosis";

  constructor(private http: HttpClient) {}

  getDiagnosis(): Observable<Diagnosis> {

    return this.http.get<Diagnosis>(this.getDiagnosisURL);
  }
}