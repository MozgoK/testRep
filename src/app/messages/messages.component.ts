import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MainService } from '../service/main.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  flagList: boolean = true;
  id: number;
  contactInfo: any;
  messageArray: any;
  newMessage: string;
  lastMessage: any;
  whoLast: string;

  constructor(private route: ActivatedRoute, private service: MainService, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params)=>{
      if (params['id']) {
        this.id = +params['id'];
        
        if (!this.genMessages()){
          // нету такого контакта
          this.router.navigate(['/messages']);
        } else {
          this.flagList = false;
        }

      } else {
        this.flagList = true;
        this.id = null;
      }
    });
  }

  genMessages(): boolean {
    this.contactInfo = _.find(this.service.listContacts, (el)=>{
      return el.id === this.id;
    });

    if (!this.contactInfo) { return false; } 
    else {
      this.messageArray = this.service.messages[this.id.toString()];

      this.lastMessage = this.messageArray[this.messageArray.length-1];
      // this.whoLast = .who;
      return true;
    }
  }


  sendMsg(){
    if (this.lastMessage.who === 'i'){
      this.lastMessage.msg.push(this.newMessage);
    } else {
      this.messageArray.push({who:'i', msg: [this.newMessage]});
      this.lastMessage = this.messageArray[this.messageArray.length-1];
    }
    console.log(this.service.messages);
  }

}
