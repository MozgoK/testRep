import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../service/main.service';
// import { DoCheck } from '@angular/core';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css']
})
export class DesktopComponent implements OnInit {

  constructor(private router: Router, private mainService: MainService) { }

  ngOnInit() {
  }
  ngDoCheck() {
  	// console.log(1+this.mainService.viewLoader);
  	// this.mainService.viewLoader = false;
  }

}