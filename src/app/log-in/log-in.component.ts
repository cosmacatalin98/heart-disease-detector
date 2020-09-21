import { Component, OnInit, Input } from "@angular/core";
import { Injectable } from "@angular/core";
import { FormControl } from "@angular/forms";
import { AuthGuardService } from "../auth-guard.service";

@Component({
  selector: "app-log-in",
  templateUrl: "./log-in.component.html",
  styleUrls: ["./log-in.component.css"]
})
export class LogInComponent implements OnInit {
  users = [];
  uName = new FormControl("");
  uPass = new FormControl("");

  constructor(private authGuardService: AuthGuardService) { }

  ngOnInit() { }

  checkUserInput() {
    var isValid = 0;

    if (this.uName.value == "scientist" && this.uPass.value == "pass123") {
      isValid = 1;
    }

    if (isValid != 1) {
      if (this.uName.value == "doctor" && this.uPass.value == "pass123") {
        isValid = 2;
      }
    }

    this.authGuardService.opt = isValid;
  }
}
