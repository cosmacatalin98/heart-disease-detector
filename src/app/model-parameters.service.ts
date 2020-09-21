import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ModelParameters } from "./model-parameters";

@Injectable()
export class ModelParametersService {
  private sendModelParametersURL = "http://127.0.0.1:5002/createModel";

  constructor(private http: HttpClient) { }

  sendModelParameters(mp: ModelParameters): Observable<ModelParameters> {
    return this.http.post<ModelParameters>(this.sendModelParametersURL, mp);
  }
}
