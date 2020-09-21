import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { MedicalRecord } from "./medical-record";

@Injectable()
export class MedicalRecordService {
  private sendMedicalRecordURL = "http://127.0.0.1:5002/sendMedicalRecord";

  constructor(private http: HttpClient) { }

  sendMedicalRecord(md: MedicalRecord): Observable<MedicalRecord> {

    return this.http.post<MedicalRecord>(this.sendMedicalRecordURL, md);
  }

}
