import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'msg',
  templateUrl: './msg.component.html'
})
export class MsgComponent implements OnInit {

  @Input() msgArray: string[];
  @Input() author: string;
  @Input() time: Date = new Date();
  @Input() avatar: string;

  constructor() { }

  ngOnInit() {
  }

}
