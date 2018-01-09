import { Injectable } from '@angular/core';
import * as _ from 'underscore';


@Injectable()


// Класс шагов	
class Stages {
	check: Array<number>;
	end: boolean;

	constructor(){
		this[1] = this[2] = this[3] = this[4] = this[5] = this[6] = this[7] = this[8] = this.end = false;
		this.check = [0,0,0,0,0,0,0,0];
	}
}

type User = {
	id: number,
	name: string,
	avatar: string,
	lastMsg: Msg | null,
	writes: boolean,
	newMsg: string,
	read: boolean
	stages?: Stages
};

type Msg = {
	go: string,
	date: Date,
	messages: Array<string>
}

type LastMsg = {
	msg: string | null
}



export class MainService {
	viewLoader: boolean = false;
	viewMenu: boolean = false;

	myName: string = 'Basil';
	myAvatar: string = 'img/logo-0.jpg';


	// Флаг попал ли пользователь на страницу авторизации
	firstPageIsAuth: boolean;

	// Список с последними сообщениями
	listLastMessage: any = {};
	// Отсортированный список контактов в зависимости от списка последних сообщений
	sortedList: any = [];

	// Количество новых сообщений
	numNewMsg: number = 0;

	// Флаг можем ли мы читать сейчас сообщения от кого-то
	read: number = null;


	listContacts: Array<User> = [
		{id: 1, name: 'Виктория', avatar: 'img/logo-4.jpg', lastMsg: null, writes: false, newMsg: '', read: true},
		{id: 2, name: 'Павел', avatar: 'img/logo-1.jpg', lastMsg: null, writes: false, newMsg: '', read: true},
		{id: 3, name: 'Йода', avatar: 'img/logo-2.jpg', lastMsg: null, writes: false, newMsg: '', read: true},
		{id: 4, name: 'Денис', avatar: 'img/logo-3.jpg', lastMsg: null, writes: false, newMsg: '', read: true},
		{id: 5, name: 'Ева', avatar: 'img/logo-5.jpg', lastMsg: null, writes: false, newMsg: '', read: true},
		{id: 6, name: 'Журавль', avatar: 'img/logo-6.jpg', lastMsg: null, writes: false, newMsg: '', read: true},
	];


	messages: any = {
		'3': [
			{go: 'out', date: new Date(2011, 0, 1, 2, 3, 4, 567), messages: ['Lorem ipsum dolor.']},
			{go: 'in', date: new Date(2011, 0, 1, 4, 10, 4, 567), messages: ['Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil.','Lorem ipsum.']},
			{go: 'out', date: new Date(2011, 0, 1, 4, 12, 4, 567), messages: ['Lorem ipsum dolor sit amet, consectetur.','Lorem ipsum.']},
			{go: 'in', date: new Date(2011, 0, 1, 17, 20, 4, 567), messages: ['Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati dicta mollitia sint illo nemo at?']}
		],
	}



	// Массив ссылок на аккаунты
	refContacts: any = this.initRefsContacts();

	initRefsContacts(): any {
		let temp = [];

		this.listContacts.forEach((el)=>{
		  temp[el.id] = el;
		  el.stages = new Stages;
		});

		return temp;
	}





	// Возвращает список последних сообщений
	createListLastMsg(contacts: Array<User>, messeges: any): Array<LastMsg> {
		let temp = [];

		contacts.forEach((el) => {
	    let tempMsg = messeges[el.id];

	    temp[el.id] = {};
	    temp[el.id].msg 
	      = tempMsg
	        ? tempMsg[tempMsg.length-1]
	        : null;
	  });

	  return temp;
	}

	// Возвращает отсортированный список
	createSortedList(contacts: Array<User>, listLastMsg: Array<LastMsg>){
		return _.sortBy(this.listContacts, (el) => {
	    return this.listLastMessage[el.id].msg
	      ? -this.listLastMessage[el.id].msg.date.getTime()
	      : -1;
	  });
	}

	// Подсчитывает количество нечитанных диалогов
	countNewMsg(sortedList: Array<any>): number{
		return _.reduce(sortedList, (num, item) =>{
			// console.log(item.read);
			return item.read
				? num
				: num + 1;
		}, 0);
	}


	// Получаем список последних сообщений и сортированный список
	getLastMessages(): void {
	  this.listLastMessage = this.createListLastMsg(this.listContacts, this.messages);
	  this.sortedList = this.createSortedList(this.listContacts, this.listLastMessage);
	  
	  this.numNewMsg = this.countNewMsg(this.sortedList);
	}


	// Получаем последнее сообщение по ID
	getMessages(id: number): void {
		this.refContacts[id].lastMsg = 
			this.messages[id]
				? this.getLastMessage(id)
				: null;
	}

	// Получаем ссылку на последнее сообщение
	getLastMessage(id: number): void {
	    return this.getLastElement(this.messages[id]);
	}

	// Возвращает последний элемент массива
	getLastElement(arr: Array<any>): void {
	    return arr[arr.length - 1];
	}


	sendMsg(id): void {
	  if (this.refContacts[id].lastMsg && this.refContacts[id].lastMsg.go === 'out'){
	  	this.pushMsg(this.refContacts[id].newMsg, id);
	  } else {
	    this.createNewMsg(this.refContacts[id].newMsg, id, 'out');
	  }

	  this.answerMsg(id, this.refContacts[id].newMsg, 1200, null);
	  this.refContacts[id].newMsg = '';
	}


	// (id, схематичное сообщение, задержка, заданный ответ)
	answerMsg(id: number, msg: string, delay: number, customAnsw: Array<string>): void {
		let answArray: any, period: number;

	  if (msg) {
		  // Если попрощались то не ответит;)
		  if (this.refContacts[id].stages.end) return;

		  // Массив с ответами
		  answArray = this.respondTo(id, msg);
	  } else {
	  	answArray = customAnsw;
	  }
	  
	  // Если вообще никакого ответа нету, то выкидываем
	  if (!answArray) return;


	  setTimeout(() => this.writesFlag(id, true), delay);
		period = (delay + 4000) / answArray.length;


	  answArray.forEach((e, ind)=>{
	    setTimeout(() => {

	      if ((ind === 0 && !this.refContacts[id].lastMsg)
	      		|| (ind === 0 && this.refContacts[id].lastMsg.go === 'out') 
	      		|| this.refContacts[id].lastMsg.go === 'out' ) {

	      	this.createNewMsg(e, id, 'in');

	      } else {
	      	// Сообщение его последнее, поэтому добавляем к нему
	      	this.pushMsg(e, id);
	      }


	      // Скидываем флаг, что кто то пишет
	      if (ind === answArray.length - 1) {
	      	this.writesFlag(id, false);

	      	// Отмечаем прочитались ли сообщения
	      	this.refContacts[id].read =
	      		this.read === id
	      			? true
	      			: false;

	      	this.getLastMessages();
	      }

	    }, period*(ind + 1));
	  });
	}


	// Меняем флаг написания сообщения для ID
	writesFlag(id: number, flag: boolean): void {
		this.refContacts[id].writes = flag;
	}

	// Создаем новое сообщение
	createNewMsg(msg: string, id: number, go: string): void {
		this.checkLastMsg(id);

    this.messages[id].push({
      go, 
      messages: [msg], 
      date: new Date()
    });

    this.refContacts[id].lastMsg = this.getLastMessage(id);
	}

	// Добавляем в последнее сообщение
	pushMsg(msg: string, id: number): void {
		this.refContacts[id].lastMsg.messages.push(msg);
	}

	// Проверяем есть ли последнее сообщение
	checkLastMsg(id: number): void {
		if (!this.refContacts[id].lastMsg) { this.messages[id] = []; }
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