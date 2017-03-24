console.log('welcome to es6');

for(let i=0; i < 10; i++){

}
console.log(i);

class Spinner{
    constructor(){
		this.__counter__ = 0;
    }
    up(){
       return ++this.__counter__;
    }
	down(){
		return --this.__counter__;
    }
}