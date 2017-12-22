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
  listLastMessage: any;
  sortedList: any;
  // whoLast: string;

  temp: string;
  answerText: string;

  constructor(private route: ActivatedRoute, private service: MainService, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params)=>{
      if (params['id']) {
        this.id = +params['id'];


        if (!this.getContactInfo()) {

          this.router.navigate(['/messages']);

        } else {

          this.flagList = false;
          this.getMessages();

        }


      } else {
        this.flagList = true;
        this.id = null;
        this.getLastMessages();
      }
    });
  }


  getLastMessages(): void {
    this.listLastMessage = {};

    // Создание списка последних сообщений
    this.service.listContacts.forEach((el, ind, arr)=>{

      let temp = this.service.messages[el.id.toString()];

      this.listLastMessage[el.id.toString()] = {};
      this.listLastMessage[el.id.toString()].lastMessage 
        = temp
          ? temp[temp.length-1]
          : null;
    });

    // Сортировка "новые сообщения вверх"
    this.sortedList = _.sortBy(this.service.listContacts, (el)=>{
      // console.log(this.listLastMessage[el.id].lastMessage);
      return this.listLastMessage[el.id].lastMessage
        ? -this.listLastMessage[el.id].lastMessage.date.getTime()
        : -1;
    });
    
  }

  getContactInfo(): boolean {
    this.contact = _.find(this.service.listContacts, (el)=>{
      return el.id === this.id;
    });

    return !!this.contact;
  }

  getMessages(): void {
      this.messageArray = this.service.messages[this.id.toString()];

      if (this.messageArray){
        this.getLastMessage();
      } else {
        this.lastMessage = null;
      }

      this.newMessage = '';
      this.service.writes = false;
      this.service.stages = {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        end: false,
        check: [0,0,0,0,0,0,0,0]
      }


  }  


  getLastMessage(): void {
      this.lastMessage = this.messageArray[this.messageArray.length-1];
  }


  sendMsg(): void{
    if (this.lastMessage && this.lastMessage.go === 'out'){

      this.lastMessage.messages.push(this.newMessage);

    } else {

      // Создаем запись в объекте сообщений
      if (!this.lastMessage) {
        this.messageArray = this.service.messages[this.id.toString()] = [];
      }

      this.messageArray.push({
        go:'out', 
        messages: [this.newMessage], 
        date: new Date(), 
        name: this.service.myName
      });

      this.getLastMessage();
    }

    this.temp = this.newMessage;
    this.newMessage = '';

    this.answerMsg();

  }


  answerMsg(): void{
    console.log(this.service.stages.end);
    if (this.service.stages.end) return;

    let answArray = this.service.respondTo(this.temp);
    
    if (!answArray) return;


    let period = 5200 / answArray.length;


    setTimeout(()=>{
      this.service.writes = true;
    }, 1200);


    answArray.forEach((e, ind)=>{
      setTimeout(()=>{

        if ((ind === 0 && this.lastMessage.go === 'out') || this.lastMessage.go === 'out') {
          this.messageArray.push({
            go:'in', 
            messages: [e], 
            date: new Date(), 
            name: this.contact.name
          });
        } else {
          this.lastMessage.messages.push(e);
        }

        this.getLastMessage();

        // Скидываем флаг, что кто то пишет
        if (ind === answArray.length - 1) this.service.writes = false;

      }, period*(ind + 1));
    });
  }


  enter(e): void{
    if (e.code.toLowerCase() === 'enter' && this.newMessage) {
      this.sendMsg();
    }
  }

}
