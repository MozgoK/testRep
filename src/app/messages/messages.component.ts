import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MainService } from '../service/main.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html'
})
export class MessagesComponent implements OnInit {
  flagList: boolean = true;
  id: number;
  contact: any;
  messageArray: any;

  temp: string;
  answerText: string;

  constructor(private route: ActivatedRoute, private service: MainService, private router: Router) { }

  ngOnInit() {
    
    this.route.queryParams.subscribe((params: Params)=>{

      if (params['id']) {
        this.id = +params['id'];

        // Получаем информацию о контакте
        this.contact = this.service.refContacts[this.id];//this.service.getContactInfo(this.id);

        if (!this.contact) {
          // Если информацию о контакте получить не удалось
          this.router.navigate(['/messages']);
        } else {
          // Получили
          this.flagList = false;

          // Мы можем читать новые сообщения
          this.service.read = this.id;
          this.service.refContacts[this.id].read = true;

          // Обновляем количество нечитанных диалогов
          this.service.numNewMsg = this.service.countNewMsg(this.service.sortedList);

          this.service.getMessages(this.id);

          setTimeout(() => document.getElementById('input').focus(), 100);
        }


      } else {
        // ID нет -> Список сообщений
        this.flagList = true;

        // Мы не можем читать новые сообщения
        this.service.read = null;

        this.id = null;
        this.service.getLastMessages();
      }
    });
  }


  // Отправляем сообщение
  enter(e): void{
    if (e.code.toLowerCase() === 'enter' && this.service.refContacts[this.id].newMsg) {
      this.service.sendMsg(this.id);
    }
  }

}
