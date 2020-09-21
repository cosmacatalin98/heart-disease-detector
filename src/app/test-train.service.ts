import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { TPercentage } from './t-percentage'

@Injectable()
export class TestTrainService {
  private sendTestPercentageURL = "http://127.0.0.1:5002/trainTestModel";

  constructor(private http: HttpClient) { }

  sendTestPercentage(tp: TPercentage): Observable<TPercentage> {
    return this.http.post<TPercentage>(this.sendTestPercentageURL, tp);
  }
}
