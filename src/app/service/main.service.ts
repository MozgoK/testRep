export class MainService {
	viewLoader: boolean = false;
	viewMenu: boolean = false;


	listContacts: any = [
		{id: 1, name: 'Den'},
		{id: 2, name: 'Den2'},
		{id: 3, name: 'Den3'},
		{id: 4, name: 'Den4'},
	];

	messages: any = {
		'1': [
			{who: 'i', msg: ['my firstmessage1','my firstmessage1']},
			{who: 'he', msg: ['his first message','his first message']},
			{who: 'i', msg: ['my second message','my second message']},
			{who: 'i', msg: ['my fird message','my fird message']}
		],
		'2': [
			{who: 'i', msg: ['my firstmessage2','my firstmessage2']},
			{who: 'he', msg: ['his first message','his first message']},
			{who: 'i', msg: ['my second message','my second message']},
			{who: 'i', msg: ['my fird message','my fird message']}
		],
		'3': [
			{who: 'i', msg: ['my firstmessage3','my firstmessage3']},
			{who: 'he', msg: ['his first message','his first message']},
			{who: 'i', msg: ['my second message','my second message']},
			{who: 'i', msg: ['my fird message','my fird message']}
		],
		'4': [
			{who: 'i', msg: ['my firstmessage4','my firstmessage4']},
			{who: 'he', msg: ['his first message','his first message']},
			{who: 'i', msg: ['my second message','my second message']},
			{who: 'i', msg: ['my fird message','my fird message']}
		],
	}
}