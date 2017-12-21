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
  contact: any;
  messageArray: any;
  newMessage: string;
  lastMessage: any;
  whoLast: string;

  temp: string;
  answerText: string;

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
    this.contact = _.find(this.service.listContacts, (el)=>{
      return el.id === this.id;
    });

    if (!this.contact) { return false; } 
    else {
      this.messageArray = this.service.messages[this.id.toString()];

      this.lastMessage = this.messageArray[this.messageArray.length-1];
      // this.whoLast = .who;
      return true;
    }
  }


  sendMsg(){
    if (!this.newMessage) return;

    if (this.lastMessage.go === 'out'){

      this.lastMessage.messages.push(this.newMessage);

    } else {

      this.messageArray.push({
        go:'out', 
        messages: [this.newMessage], 
        date: new Date(), 
        name: this.service.myName
      });

      this.lastMessage = this.messageArray[this.messageArray.length-1];
    }

    this.temp = this.newMessage;
    this.newMessage = '';

    this.answerMsg();

  }

  answerMsg(){
    if (this.temp.toLowerCase().indexOf('привет') !== -1) {
      this.answerText = 'Привет';
    } else {
      return;
    }

    setTimeout(()=>{
      this.service.writes = true;
    }, 1200);

    setTimeout(()=>{
      this.service.writes = false;

      this.messageArray.push({
        go:'in', 
        messages: [this.answerText], 
        date: new Date(), 
        name: this.contact.name
      });

      this.lastMessage = this.messageArray[this.messageArray.length-1];

    }, 5200);
  }

  enter(e){
    if (e.code.toLowerCase() === 'enter') {
      this.sendMsg();
    }
    // e.preventDefault();
    // e.stopPropagination();

  }

}
