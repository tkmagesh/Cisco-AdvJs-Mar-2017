function Spinner(){
	var counter = 0;
	this.up = function(){
		return ++counter;
    };
	this.down = function(){
		return --counter;
    };
}

function Spinner(){
	this.__counter__ = 0;
}
Spinner.prototype.up = function() {
	return ++this.__counter__;
};
Spinner.prototype.down = function() {
	return --this.__counter__;
};


function SalaryCalculator(basic, hra, da, tax){
	this.basic = basic;
    this.hra = hra;
    this.da = da;
    this.tax = tax;
	this.salary = 0;
}
SalaryCalculator.prototype.calculate = function(){
	var gross = this.basic + this.hra + this.da;
	var net = gross * ((100-this.tax)/100);
	this.salary = net;
}