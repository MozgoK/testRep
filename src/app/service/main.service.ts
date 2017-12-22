export class MainService {
	viewLoader: boolean = false;
	viewMenu: boolean = false;

	myName: string = 'Basil';
	myAvatar: string = 'https://imgur.com/njFu5Im.jpg';

	writes: boolean = false;

	url: string;

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
		{id: 1, name: 'Виктория', avatar: 'https://imgur.com/LQpU6MT.jpg'},
		{id: 2, name: 'Павел', avatar: 'https://imgur.com/Jtu08lz.jpg'},
		{id: 3, name: 'Йода', avatar: 'https://imgur.com/LQpU6MT.jpg'},
		{id: 4, name: 'Денис', avatar: 'https://imgur.com/1tlJFNd.jpg'},
	];

	messages: any = {
		'1': [
			{go: 'out', date: new Date(2011, 0, 1, 2, 3, 4, 567), messages: ['Lorem ipsum dolor.']},
			{go: 'in', date: new Date(2011, 0, 1, 4, 10, 4, 567), messages: ['Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil.','Lorem ipsum.']},
			{go: 'out', date: new Date(2011, 0, 1, 4, 12, 4, 567), messages: ['Lorem ipsum dolor sit amet, consectetur.','Lorem ipsum.']},
			{go: 'in', date: new Date(2011, 0, 1, 17, 20, 4, 567), messages: ['Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati dicta mollitia sint illo nemo at?']}
		],
	}





	respondTo(input): string[] {

		let answer: string[] = [];
	
		input = input.toLowerCase();
		
		if (this.match('(привет|здравствуй|приветствую|здрасте|здарова|хай|hi|прива|прив|здоров)(\\s|!|\\.|$)', input))
			answer.push(this.testAnswer(1, this.getRandomInt(1, 5)));

		
		if(this.match('как дела', input) || this.match('как жизнь', input)  || this.match('как поживаешь', input) || this.match('как ты', input))
			answer.push(this.testAnswer(2, this.getRandomInt(1, 6)));

		if (this.match('(хорошо|отлично|прекрасно|здоровски)(\\s|!|\\.|$)', input))
			answer.push(this.testAnswer(3, this.getRandomInt(1, 3)));

		if(this.match('молоко', input))
			answer.push(this.testAnswer(4, 1));

		if(this.match('ха', input) || this.match('хи', input) || this.match('лол', input)  || this.match('смешной', input))
			answer.push(this.testAnswer(5, this.getRandomInt(1, 4)));

		if(this.match('нет', input))
			answer.push(this.testAnswer(6, 1));

		if(this.match('бот', input))
			answer.push(this.testAnswer(7, this.getRandomInt(1, 2)));
		

		if (this.match('(пока|досвид|прощай|покеда|bye)(\\s|!|\\.|$)', input))
			answer.push(this.testAnswer(8, this.getRandomInt(1, 6)));


		if (!answer.length) {answer.push(this.testAnswer(9, this.getRandomInt(1, 3)));}

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

	testAnswer(stage, number): string {
		if (this.stages[stage] && !this.stages.end){

			if (this.stages.check[stage-1] === 0) {
				this.stages.check[stage-1]++;
				return this.answers.yet[stage][number];
			} else {
				return 'куриные мозги?;)';
			}
			// yet
			
		} else {
			this.stages[stage] = true;

			if (stage === 8) this.stages.end = true;
			return this.answers.new[stage][number];
		}
	}
}