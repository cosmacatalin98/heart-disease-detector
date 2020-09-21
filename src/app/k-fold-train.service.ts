import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { KFold } from "./k-fold";

@Injectable()
export class KFoldTrainService {
  private sendKFoldURL = "http://127.0.0.1:5002/kfoldTestModel";

  constructor(private http: HttpClient) { }

  sendKFold(k: KFold): Observable<KFold> {
    return this.http.post<KFold>(this.sendKFoldURL, k);
  }
}
