
function getIsPrime(){
	var cache = {};
	function isPrime(n){
		if (n <= 3) return true;
		for(var index = 2; index <= (n/2); index++)
			if (n % index === 0) return false;
		return true;
	}
	return function(n){
		if (typeof cache[n] === 'undefined')
			cache[n] = isPrime(n);
		return cache[n];
	};
}


function getIsEvenOrOdd(){
	var cache = {};
	function isEvenOrOdd(n){
		return n % 2 === 0 ? 'even' : 'odd';
	}
	return function(n){
		if (typeof cache[n] === 'undefined')
			cache[n] = isEvenOrOdd(n);
		return cache[n];
	};
}

//the algoFn can have only one argument
function memoize(algoFn){
	var cache = {};
	return function(n){
		if (typeof cache[n] === 'undefined')
			cache[n] = algoFn(n);
		return cache[n];
	};
}

//the algoFn can take any number of arguments
function memoize(algoFn){
	var cache = {};
	return function(){
		var key = JSON.stringify(arguments);
		if (typeof cache[key] === 'undefined')
			cache[key] = algoFn.apply(this, arguments);
		return cache[key];
	}
}