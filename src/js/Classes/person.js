export default class Person{
	constructor(name){
		this.name = name;
	}

	greet(){
		document.getElementsByTagName('body')[0].innerHTML = `<h1>Congratulations: ${this.name} now you are in webpack dev-server</h1>`;
		document.getElementsByTagName('title')[0].innerHTML = `Hi ${this.name}!`;
	}
}
