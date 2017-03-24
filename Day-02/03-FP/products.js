var products = [
	{id : 6, name : "Pen", cost : 15, units : 50, category : "stationary"},
	{id : 2, name : "Hen", cost : 200, units : 10, category : "live-stock"},
	{id : 8, name : "Pencil", cost : 10, units : 100, category : "stationary"},
	{id : 5, name : "Marker", cost : 30, units : 25, category : "stationary"},
	{id : 9, name : "Dal", cost : 80, units : 40, category : "grocery"}
];

function describe(title, fn){
	console.group(title);
	fn();
	console.groupEnd();
}
/*
sort
filter
all - assignment
any - assignment
groupBy
map
aggregate ( reduce )
*/

describe("Default product list", function(){
	console.table(products);
});

describe('Sort', function(){
	describe('Default Sort - [Products by id]', function(){
		function sort(){
			for(var i = 0; i < products.length-1; i++)
				for(var j = i + 1; j < products.length; j++)
					if (products[i].id > products[j].id){
						var temp = products[i];
						products[i] = products[j];
						products[j] = temp;
					}
		}
		sort();
		console.table(products);
	});
	describe("Any list by any attribute" , function(){
		function sort(list, attrName){
			for(var i = 0; i < list.length-1; i++)
				for(var j = i + 1; j < list.length; j++)
					if (list[i][attrName] > list[j][attrName]){
						var temp = list[i];
						list[i] = list[j];
						list[j] = temp;
					}
		}
		describe('Products by cost', function(){
			sort(products, "cost");
			console.table(products);
		});
		describe('Products by units', function(){
			sort(products, "units");
			console.table(products);
		});
	});

	describe("Any list by any comparer", function(){
		function sort(list, comparerFn){
			for(var i = 0; i < list.length-1; i++)
				for(var j = i + 1; j < list.length; j++)
					if (comparerFn(list[i], list[j]) > 0){
						var temp = list[i];
						list[i] = list[j];
						list[j] = temp;
					}
		}
		describe("Product by value [ value = cost * units ]", function(){
			var productComparerByValue = function(p1, p2){
				var p1Value = p1.units * p1.cost,
					p2Value = p2.units * p2.cost;
				if (p1Value < p2Value) return -1;
				if (p1Value === p2Value) return 0;
				return 1;
			};
			sort(products, productComparerByValue);
			console.table(products);
		})
	})
	
});

describe('filter', function(){
	describe('costly products [ cost > 50 ]', function(){
		function filterCostlyProducts(){
			var result = [];
			for(var index= 0; index < products.length; index++)
				if (products[index].cost > 50)
					result.push(products[index]);
			return result;
		}
		var costlyProducts = filterCostlyProducts();
		console.table(costlyProducts);
		
	});
	describe('Any list by any criteria', function(){
		function filter(list, criteriaFn){
			var result = [];
			for(var index= 0; index < list.length; index++)
				if (criteriaFn(list[index]))
					result.push(list[index]);
			return result;
		}
		
		
		function negate(criteriaFn){
			return function(){
				return !criteriaFn.apply(this, arguments);
			};
		}
		describe("Products By Units ", function(){
			var underStockedProductCriteria = function(product){
				return product.units < 50;
			};
			describe('Understocked products [ units < 50 ]', function(){
				var UnderstockedProducts = filter(products, underStockedProductCriteria);
				console.table(UnderstockedProducts)
			});
			describe("Well stocked products [ units >= 50 ]", function(){
				/*var wellStockedProductCriteria = function(product){
					return !underStockedProductCriteria(product);
				};*/
				var wellStockedProductCriteria = negate(underStockedProductCriteria);

				var wellStockedProducts = filter(products, wellStockedProductCriteria);
				console.table(wellStockedProducts);
			});
		})
		
		describe("Products By Category", function(){
			var stationaryProductCriteria = function(product){
				return product.category === 'stationary';
			};

			describe("stationary products ", function(){
				var stationaryProducts = filter(products, stationaryProductCriteria);
				console.table(stationaryProducts);
			});

			describe("non stationary products ", function(){
				/*var nonStationaryProductCriteria = function(product){
					return !stationaryProductCriteria(product);
				};*/
				var nonStationaryProductCriteria = negate(stationaryProductCriteria);
				var stationaryProducts = filter(products, nonStationaryProductCriteria);
				console.table(stationaryProducts);
			});
		});
	})
});

describe('groupBy', function(){
	function groupBy(list, keySelector){
		var result = {};
		for(var index = 0; index < list.length; index++){
			var key = keySelector(list[index]);
			result[key] = result[key] || [];
			result[key].push(list[index]);
		}
		return result;
	}
	function printGroup(groupedItem){
		for(var key in groupedItem){
			describe('Key - [' + key + ']', function(){
				console.table(groupedItem[key]);
			});
		}
	}
	describe("Products by catgory", function(){
		var categoryKeySelector = function(product){
			return product.category;
		};
		var productsByCategory = groupBy(products, categoryKeySelector);
		printGroup(productsByCategory);
	});

	describe("Products by cost", function(){
		var costKeySelector = function(product){
			return product.cost < 50 ? "affordable" : "costly";
		};
		var productsByCost = groupBy(products, costKeySelector);
		printGroup(productsByCost);
	});
});

function after(times, fn){
	return function(){
		if (--times <= 0)
			return fn.apply(this, arguments);
	}
}