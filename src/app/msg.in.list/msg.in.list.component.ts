import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'msg-in-list',
  templateUrl: './msg.in.list.component.html'
})
export class MsgInListComponent implements OnInit {

  @Input() lastMsg: any;
  @Input() name: string;
  @Input() avatar: string;
  @Input() writes: boolean;
  @Input() read: boolean;
  @Input() isNewChat: boolean = false;
  msg: string;
  IAM: boolean = false;
  time: Date;

  constructor() { }

  ngOnInit() {
    
  }

  checkMsg() {
    if (this.msg.length > 75) {
      this.msg = this.msg.substr(0, 75) + '..';
    }
    this.IAM = !!(this.lastMsg.go === 'out')
    // if (this.lastMsg.go === 'out') {
    //   this.IAM = true;
    // } else {

    // }
  }

  ngOnChanges() {
    // console.log(this.lastMsg);
    if (this.lastMsg){
      this.msg = this.lastMsg.messages[this.lastMsg.messages.length-1];
      this.time = this.lastMsg.date;
      this.checkMsg();
    } else {
      this.msg = 'Это новый чат с другом..';
      this.isNewChat = true;
    }
   }
}
