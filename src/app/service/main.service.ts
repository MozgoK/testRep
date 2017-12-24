import { Injectable } from '@angular/core';
import * as _ from 'underscore';

@Injectable()

export class MainService {
	viewLoader: boolean = false;
	viewMenu: boolean = false;

	myName: string = 'Basil';
	myAvatar: string = 'https://imgur.com/L3MD9ZS.jpg';

	writes: boolean = false;

	url: string;


	listLastMessage: any = {};
	sortedList: any = [];

	refContacts: any = [];

	read: number = null;

	stages = {
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


	listContacts: any = [
		{id: 1, name: 'Виктория', avatar: 'https://imgur.com/LQpU6MT.jpg', lastMsg: [], writes: false, newMsg: '', read: true},
		{id: 2, name: 'Павел', avatar: 'https://imgur.com/Jtu08lz.jpg', lastMsg: [], writes: false, newMsg: '', read: true},
		{id: 3, name: 'Йода', avatar: 'https://imgur.com/njFu5Im.jpg', lastMsg: [], writes: false, newMsg: '', read: true},
		{id: 4, name: 'Денис', avatar: 'https://imgur.com/1tlJFNd.jpg', lastMsg: [], writes: false, newMsg: '', read: true},
		{id: 5, name: 'Лиза', avatar: 'https://imgur.com/g5hSpRA.jpg', lastMsg: [], writes: false, newMsg: '', read: true},
		{id: 6, name: 'Журавль', avatar: 'https://imgur.com/mwDN7GW.jpg', lastMsg: [], writes: false, newMsg: '', read: true},
	];

	messages: any = {
		'3': [
			{go: 'out', date: new Date(2011, 0, 1, 2, 3, 4, 567), messages: ['Lorem ipsum dolor.']},
			{go: 'in', date: new Date(2011, 0, 1, 4, 10, 4, 567), messages: ['Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil.','Lorem ipsum.']},
			{go: 'out', date: new Date(2011, 0, 1, 4, 12, 4, 567), messages: ['Lorem ipsum dolor sit amet, consectetur.','Lorem ipsum.']},
			{go: 'in', date: new Date(2011, 0, 1, 17, 20, 4, 567), messages: ['Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati dicta mollitia sint illo nemo at?']}
		],
	}


	// Получаем информацию о контакте
	getContactInfo(id): any {
	  let contact = _.find(this.listContacts, (el)=>{ return el.id === id; });
	  return contact;
	}

	// Получаем список последних сообщений и сортированный список
	getLastMessages(): void {
	  this.listLastMessage = {};

	  // Создание списка последних сообщений
	  this.listContacts.forEach((el, ind, arr)=>{
	    let temp = this.messages[el.id];

	    this.listLastMessage[el.id] = {};
	    this.listLastMessage[el.id].msg 
	      = temp
	        ? temp[temp.length-1]
	        : null;
	  });

	  // Сортировка "новые сообщения вверх"
	  this.sortedList = _.sortBy(this.listContacts, (el)=>{
	    return this.listLastMessage[el.id].msg
	      ? -this.listLastMessage[el.id].msg.date.getTime()
	      : -1;
	  });
	}


	getMessages(id): void {
	    // let messageArray = this.messages[id];

	    if (this.messages[id]){
	      this.getLastMessage(id);
	    } else {
	      this.refContacts[id].lastMsg = null;
	    }

	    this.refContacts[id].newMsg = '';
	    this.refContacts[id].writes = false;
	    this.refContacts[id].stages = {
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


	getLastMessage(id): void {
	    this.refContacts[id].lastMsg = this.messages[id][this.messages[id].length-1];
	}


	sendMsg(id): void {

	  if (this.refContacts[id].lastMsg 
	  		&& this.refContacts[id].lastMsg.go === 'out'){

	    this.refContacts[id].lastMsg.messages.push(this.refContacts[id].newMsg);

	  } else {

	    // Создаем запись в объекте сообщений
	    if (!this.refContacts[id].lastMsg) {
	      this.messages[id] = [];
	    }

	    this.messages[id].push({
	      go:'out', 
	      messages: [this.refContacts[id].newMsg], 
	      date: new Date(), 
	      name: this.myName
	    });

	    this.getLastMessage(id);
	  }



	  this.answerMsg(id, this.refContacts[id].newMsg);

	  // this.temp = this.refContacts[id].newMsg;
	  this.refContacts[id].newMsg = '';
	}



	answerMsg(id, msg): void {

	  // console.log(this.refContacts[id].stages.end);
	  if (this.refContacts[id].stages.end) return;

	  let answArray = this.respondTo(id, msg);
	  
	  if (!answArray) return;


	  let period = 5200 / answArray.length;


	  setTimeout(()=>{
	    this.refContacts[id].writes = true;
	  }, 1200);


	  answArray.forEach((e, ind)=>{
	    setTimeout(()=>{

	      if ((ind === 0 && this.refContacts[id].lastMsg.go === 'out') 
	      		|| this.refContacts[id].lastMsg.go === 'out') {

	        this.messages[id].push({
	          go:'in', 
	          messages: [e], 
	          date: new Date(), 
	          name: this.getContactInfo(id).name
	        });
	      } else {
	        this.refContacts[id].lastMsg.messages.push(e);
	      }



	      // Скидываем флаг, что кто то пишет
	      if (ind === answArray.length - 1) {
	      	this.refContacts[id].writes = false;

	      	this.refContacts[id].read =
	      		this.read === id
	      			? true
	      			: false;

	      	this.getLastMessages();
	      }

	      this.getLastMessage(id);

	    }, period*(ind + 1));
	  });
	}



	respondTo(id, input): string[] {

		let answer: string[] = [];
	
		input = input.toLowerCase();
		
		if (this.match('(привет|здравствуй|приветствую|здрасте|здарова|хай|hi|прива|прив|здоров)(\\s|!|\\.|$)', input))
			answer.push(this.testAnswer(id, 1, this.getRandomInt(1, 5)));

		
		if(this.match('как дела', input) || this.match('как жизнь', input)  || this.match('как поживаешь', input) || this.match('как ты', input))
			answer.push(this.testAnswer(id, 2, this.getRandomInt(1, 6)));

		if (this.match('(хорошо|отлично|прекрасно|здоровски)(\\s|!|\\.|$)', input))
			answer.push(this.testAnswer(id, 3, this.getRandomInt(1, 3)));

		if(this.match('молоко', input))
			answer.push(this.testAnswer(id, 4, 1));

		if(this.match('ха', input) || this.match('хи', input) || this.match('лол', input)  || this.match('смешной', input))
			answer.push(this.testAnswer(id, 5, this.getRandomInt(1, 4)));

		if(this.match('нет', input))
			answer.push(this.testAnswer(id, 6, 1));

		if(this.match('бот', input))
			answer.push(this.testAnswer(id, 7, this.getRandomInt(1, 2)));
		

		if (this.match('(пока|досвид|прощай|покеда|bye)(\\s|!|\\.|$)', input))
			answer.push(this.testAnswer(id, 8, this.getRandomInt(1, 6)));


		if (!answer.length) {answer.push(this.testAnswer(id, 9, this.getRandomInt(1, 3)));}

		return answer;
	}
		

	match(regex, input): any {
		return new RegExp(regex).test(input);
	}

	getRandomInt(min, max): number {
	  return Math.floor(Math.random() * (max - min)) + min;
	}


	answers = {
		new: {
			1: {
				1: 'Привет)',
				2: 'Привет!',
				3: 'Хаюшки))',
				4: 'Ооо, давно не списывались, ну привет))',
				5: 'приветствую, друг!'
			},
			2: {
				1: 'у меня отличн, устаю только немного) а ты как?',
				2: 'у меня молоко убежало:\'(',
				3: 'да я только и делаю что жду тебя;)',
				4: 'да хорошо, такая радость что списались спустя долгое время',
				5: 'нормик, только что молоко на кухне было спасен:)',
				6: 'Живу жизнь нелегкую. Как ты?'
			},
			3: {
				1: 'славно)',
				2: 'душа радуется за тебя)',
				3: 'прекрасно))',
			},
			4: {
				1: 'Ну у меня чуть молоко не убежало, а моих сил хватило, чтобы с ним совладать'
			},
			5: {
				1: 'чего смешного?)',
				2: 'чего это тебя развеселило?',
				3: 'чтооо?))',
				4: 'и что было сказано такого смешного, а?'
			},
			6: {
				1: 'Никак нет!'
			},
			7: {
				1: 'бот? кто бот? я не бот!',
				2: 'о каком боте идет речь?'
			},
			8: {
				1: 'Ну пока)',
				2: 'Окей, тоже побегу',
				3: 'пока пока;)',
				4: 'до связи!',
				5: 'До скорого!',
				6: 'всего хорошего)'
			},
			9: {
				1: 'не понятно как то увы))',
				2: 'что??',
				3: 'и к чему это?)'
			}
		},
		yet: {
			1: {
				1: 'уже ведь поздоровались)',
				2: 'не путайся, здоровались ведь!',
				3: 'мб хочешь наоборот попращаться?))',
				4: 'как ты мог забыть а? мы ведь здоровались',
				5: 'и еще раз привет)) ага)'
			},
			2: {
				1: 'узнавал бедняга.',
				2: 'ну давай еще раз поспрашивает как мы))',
				3: 'да и я конечно тоже за пару минут забыл как у тебя дела;)',
				4: 'пропить таблетки для памяти?',
				5: 'повторюсь, еще в мире живых!)',
				6: 'эх, друг мой друг'
			},
			3: {
				1: 'славно)',
				2: 'душа радуется за тебя)',
				3: 'прекрасно))',
			},
			4: {
				1: 'Да все хорошо с этим молоком, опять ты меня не слушаешь!'
			},
			5: {
				1: 'ну хватит хихикать тут!',
				2: 'я так обижусь!',
				3: 'перестань ржать там',
				4: 'ну все, больше ни слова от меня'
			},
			6: {
				1: 'а вот и ДА!'
			},
			7: {
				1: 'не буду больше про бота говорить)',
				2: 'Так чтобы я больше не слышал слова \'бот\'!'
			},
			9: {
				1: 'не понятно как то увы))',
				2: 'что??',
				3: 'и к чему это?)'
			}
		}
	}

	testAnswer(id, stage, number): string {
		if (this.refContacts[id].stages[stage] && !this.refContacts[id].stages.end){

			if (this.refContacts[id].stages.check[stage-1] === 0) {
				this.refContacts[id].stages.check[stage-1]++;
				return this.answers.yet[stage][number];
			} else {
				return 'куриные мозги?;)';
			}
			
		} else {
			this.refContacts[id].stages[stage] = true;

			if (stage === 8) this.refContacts[id].stages.end = true;
			return this.answers.new[stage][number];
		}
	}
}