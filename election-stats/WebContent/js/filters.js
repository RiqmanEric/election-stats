'use strict';

/* Filters */

angular.module('esi.filters', [])
	.filter('truncate', function () {
		return function (text, length, end) {
			if (isNaN(length))
				length = 10;
			if (end === undefined)
				end = "...";
			if (text.length <= length || text.length - end.length <= length) {
				return text;
			}
			else {
				return String(text).substring(0, length-end.length) + end;
			}

		};
	})
	.filter('removeJunk', function () {
		return function (text) {
			//console.log(text); 
			var str="";
			str =String(text).split("$$");
			var finalStr="";
			for (var i = 0; i<str.length; i++) {
				var tuples=str[i].split(":");
				if(typeof(tuples[1]) != "undefined"){
					var tup="<b>"+tuples[0]+" : </b>"+tuples[1];
					console.log(tup);
					finalStr=finalStr+tup+"<br>";
				}	
			};
			return finalStr;
		};
	});
