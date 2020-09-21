import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MedicalRecordService } from "../medical-record.service";
import { DiagnosisService } from "../diagnosis.service";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-doctor-panel",
  templateUrl: "./doctor-panel.component.html",
  styleUrls: ["./doctor-panel.component.css"]
})
export class DoctorPanelComponent implements OnInit {
  age = new FormControl("", [Validators.pattern('[0-9]{1,2}')]); // 1
  sex = new FormControl("", [Validators.pattern('[0-1]{1}')]); // 2
  cpt = new FormControl("", [Validators.pattern('[0-3]{1}')]); // 3
  rbp = new FormControl("", [Validators.pattern('[0-9]{1,3}')]); // 4
  sc = new FormControl("", [Validators.pattern('[0-9]{1,3}')]); // 5
  fbs = new FormControl("", [Validators.pattern('[0-1]{1}')]); // 6
  rer = new FormControl("", [Validators.pattern('[0-2]{1}')]); // 7
  mhra = new FormControl("", [Validators.pattern('[0-9]{1,3}')]); // 8
  eia = new FormControl("", [Validators.pattern('[0-1]{1}')]); // 9
  oldpeak = new FormControl("", [Validators.pattern('^[0-7]{1}(\.[0-7]{1})?$')]); // 10
  tsotpe = new FormControl("", [Validators.pattern('[0-2]{1}')]); // 11
  nomv = new FormControl("", [Validators.pattern('[0-3]{1}')]); // 12
  thatl = new FormControl("", [Validators.pattern('[0-3]{1}')]); // 13

  res = new FormControl({ value: "", disabled: true }); // 14
  acc = new FormControl({ value: "", disabled: true }); // 15

  mrd;
  dia;

  constructor(
    private medicalRecordService: MedicalRecordService,
    private diagnosisService: DiagnosisService
  ) {}

  ngOnInit() {
    this.diagnosisService.getDiagnosis().subscribe(data => (this.dia = data));
  }

  sendMedicalRecord() {
    this.mrd = {
      age: this.age.value,
      sex: this.sex.value,
      cpt: this.cpt.value,
      rbp: this.rbp.value,
      sc: this.sc.value,
      fbs: this.fbs.value,
      rer: this.rer.value,
      mhra: this.mhra.value,
      eia: this.eia.value,
      oldpeak: this.oldpeak.value,
      tsotpe: this.tsotpe.value,
      nomv: this.nomv.value,
      thatl: this.thatl.value
    };

    this.medicalRecordService
      .sendMedicalRecord(this.mrd)
      .subscribe(data => (this.mrd = data));
  }

  getDiagnosis() {
    return this.diagnosisService
      .getDiagnosis()
      .pipe(tap(data => (this.dia = data)));
  }

  processData() {
    this.sendMedicalRecord();
  }

  getDiagnosisForMedicalRecord() {
    this.getDiagnosis().subscribe(
      () => (
        this.res.reset(""),
        this.acc.reset(""),
        this.res.setValue(this.dia.result),
        this.acc.setValue(this.dia.accuracy)
      )
    );
  }
}
