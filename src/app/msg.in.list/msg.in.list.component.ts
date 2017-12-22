import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'msg-in-list',
  templateUrl: './msg.in.list.component.html',
  styleUrls: ['./msg.in.list.component.css']
})
export class MsgInListComponent implements OnInit {

  @Input() lastMsg: any;
  @Input() name: string;
  @Input() avatar: string;
  msg: string;
  isNewChat: boolean = false;
  IAM: boolean = false;
  time: Date;

  constructor() { }

  ngOnInit() {
    if (this.lastMsg){
      this.msg = this.lastMsg.messages[this.lastMsg.messages.length-1];
      this.time = this.lastMsg.date;
      this.checkMsg();
    } else {
      this.msg = 'Это новый чат с другом..';
      this.isNewChat = true;
    }
  }

  checkMsg() {
    if (this.msg.length > 75) {
      this.msg = this.msg.substr(0, 75) + '..';
    }
    if (this.lastMsg.go === 'out') {
      this.IAM = true;
    }
  }
}
