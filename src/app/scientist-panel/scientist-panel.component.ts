import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DynamicGrid } from "../dynamic-grid";
import { ModelParametersService } from "../model-parameters.service";
import { TestTrainService } from "../test-train.service";
import { AccuracyService } from "../accuracy.service";
import { KFoldTrainService } from "../k-fold-train.service";
import { tap } from "rxjs/operators";

@Component({
  selector: 'app-scientist-panel',
  templateUrl: './scientist-panel.component.html',
  styleUrls: ['./scientist-panel.component.css']
})
export class ScientistPanelComponent implements OnInit {
  indim = new FormControl("");
  outdim = new FormControl("");
  lastafunction = new FormControl("");
  costfunction = new FormControl("");
  optalg = new FormControl("");
  testper = new FormControl("", [Validators.pattern('^[0]{1}(\.[0-9]{1,2})?$')]);
  kfold = new FormControl("");
  acc = new FormControl({ value: "", disabled: true });
  epochs = new FormControl("");
  batchsize = new FormControl("");

  dynamicArray: Array<DynamicGrid> = [];
  newDynamic: any = {};
  index: number = 2;
  mp;
  tp;
  ac;
  kf;

  afunctions = ['relu', 'sigmoid', 'tanh', 'softmax', 'softplus', 'softsign', 'elu', 'selu', 'exponential'];
  cfunctions = ['binary_crossentropy', 'categorical_crossentropy', 'sparse_categorical_crossentropy', 'poisson']
  optalgs = ['adam', 'adadelta', 'adamax', 'adagrad', 'sgd', 'nadam', 'rmsprop', 'ftrl'];

  constructor(
    private modelParametersService: ModelParametersService,
    private testTrainService: TestTrainService,
    private accuracyService: AccuracyService,
    private kfoldService: KFoldTrainService
  ) { }

  ngOnInit(): void {
    this.newDynamic = { layer: 1, neurons: 0, afunction: "" };
    this.dynamicArray.push(this.newDynamic);
  }

  addRow() {
    this.newDynamic = { layer: this.index, neurons: 0, afunction: "" };
    this.dynamicArray.push(this.newDynamic);
    this.index = this.index + 1;
    return true;
  }

  deleteRow() {
    this.dynamicArray.pop();
    this.index = this.index - 1;
    return true;
  }
  sendModelParameters() {
    var finalDynamicArray = this.dynamicArray.slice(0);
    finalDynamicArray.pop();

    this.mp = {
      indim: this.indim.value,
      outdim: this.outdim.value,
      lastafunction: this.lastafunction.value,
      costfunction: this.costfunction.value,
      optalg: this.optalg.value,
      layers: finalDynamicArray
    };
    this.modelParametersService
      .sendModelParameters(this.mp)
      .subscribe(data => (this.mp = data));
  }

  sendTestPercentage() {
    this.tp = {
      testper: this.testper.value,
      epochs: this.epochs.value,
      bsize: this.batchsize.value
    };
    this.testTrainService
      .sendTestPercentage(this.tp)
      .subscribe(data => (this.tp = data));
  }

  sendKFold() {
    this.kf = {
      k: this.kfold.value,
      epochs: this.epochs.value,
      bsize: this.batchsize.value
    };
    this.kfoldService.sendKFold(this.kf).subscribe(data => (this.kf = data));
  }

  getAccuracy() {
    return this.accuracyService
      .getAccuracy()
      .pipe(tap(data => (this.ac = data)));
  }

  setAccuracy() {
    this.getAccuracy().subscribe(() => this.acc.setValue(this.ac.accuracy));
  }
}