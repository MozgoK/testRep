export class MainService {
	viewLoader: boolean = false;
	viewMenu: boolean = false;

	myName: string = 'Basil';
	myAvatar: string = 'https://imgur.com/njFu5Im.jpg';

	writes: boolean = false;


	listContacts: any = [
		{id: 1, name: 'Виктория', avatar: 'https://imgur.com/LQpU6MT.jpg'},
		{id: 2, name: 'Павел', avatar: 'https://imgur.com/Jtu08lz.jpg'},
		{id: 3, name: 'Йода', avatar: 'https://imgur.com/LQpU6MT.jpg'},
		{id: 4, name: 'Денис', avatar: 'https://imgur.com/1tlJFNd.jpg'},
	];

	messages: any = {
		'1': [
			{go: 'out', name: this.myName, date: new Date(2011, 0, 1, 2, 3, 4, 567), messages: ['Lorem ipsum dolor.']},
			{go: 'in', name: 'Виктория', date: new Date(2011, 0, 1, 4, 10, 4, 567), messages: ['Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil.','Lorem ipsum.']},
			{go: 'out', name: this.myName, date: new Date(2011, 0, 1, 4, 12, 4, 567), messages: ['Lorem ipsum dolor sit amet, consectetur.','Lorem ipsum.']},
			{go: 'in', name: 'Виктория', date: new Date(2011, 0, 1, 17, 20, 4, 567), messages: ['Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati dicta mollitia sint illo nemo at?']}
		],
	}
}