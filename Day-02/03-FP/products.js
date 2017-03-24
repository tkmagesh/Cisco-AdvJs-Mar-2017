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
all
any
groupBy
map
aggregate
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
		describe('Understocked products [ units < 50 ]', function(){
			var underStockedProductCriteria = function(product){
				return product.units < 50;
			};
			var UnderstockedProducts = filter(products, underStockedProductCriteria);
			console.table(UnderstockedProducts)
		})
	})
});