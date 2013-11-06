'use strict';

/* Controllers */

angular.module('esi.controllers', []);

function MenuCntl($scope, menuService) {
	$scope.menu = menuService.getMenu();
}

function DataCntl($scope, dataService){
	$scope.data = dataService.getData();
	$scope.candidates = [
		{
			name: "Atal Bihari",
			state: "Uttarprdesh",
			constituency: "Lucknow",
			vote: 901002,
			votePercent: "20%",
			result: "Won",
			image: "atalji.jpg"
		},
		{
			name: "Atal Bihari2",
			state: "Uttarprdesh",
			constituency: "Lucknow",
			vote: 901002,
			votePercent: "20%",
			result: "Won",
			image: "atalji.jpg"
		},
		{
			name: "Atal Bihari3",
			state: "Uttarprdesh",
			constituency: "Lucknow",
			vote: 901002,
			votePercent: "20%",
			result: "Won",
			image: "atalji.jpg"
		},
	];
	$scope.discussions = [
		{
			content: "Bacon ipsum dolor sit amet nulla ham qui sint exercitation eiusmod commodo, chuck duis velit. Aute in reprehenderit, dolore aliqua non est magna in labore pig pork biltong.",
			user: "Someone",
			comments: 2,
		},
		{
			content: "com1 Bacon ipsum dolor sit amet nulla ham qui sint exercitation eiusmod commodo, chuck duis velit. Aute in reprehenderit, dolore aliqua non est magna in labore pig pork biltong.",
			user: "Someone",
			comments: 0,
		},
		{
			content: "com2 Bacon ipsum dolor sit amet nulla ham qui sint exercitation eiusmod commodo, chuck duis velit. Aute in reprehenderit, dolore aliqua non est magna in labore pig pork biltong.",
			user: "Someone",
			comments: 0,
		},
		{
			content: "dis2 Bacon ipsum dolor sit amet nulla ham qui sint exercitation eiusmod commodo, chuck duis velit. Aute in reprehenderit, dolore aliqua non est magna in labore pig pork biltong.",
			user: "Someone",
			comments: 1,
		},
		{
			content: "com3 Bacon ipsum dolor sit amet nulla ham qui sint exercitation eiusmod commodo, chuck duis velit. Aute in reprehenderit, dolore aliqua non est magna in labore pig pork biltong.",
			user: "Someone",
			comments: 1,
		},
		{
			content: "com31 sBacon ipsum dolor sit amet nulla ham qui sint exercitation eiusmod commodo, chuck duis velit. Aute in reprehenderit, dolore aliqua non est magna in labore pig pork biltong.",
			user: "Someone",
			comments: 0,
		}
	];
}

function HomeCntl($scope, menuService, dataService){
	menuService.update({
		title: "Home"
	});
	dataService.updateParty("");
	dataService.updateFilters([]);
}

function PartyCntl($scope, $route, Party, menuService, dataService){
	var partyPromise = Party.get($route.current.params.partyname);
	partyPromise.then(function(p){
		console.log(p);
		$scope.party = p;
		$scope.filters = [
			{
				type: "election",
				values: [2009, 2004, 1999, 1998]
			},
			{
				type: "state",
				values: ["Andhra Pradesh", "Maharashtra", "Rajasthan", "NCT of Delhi"]
			}
		];
		menuService.update({
			title: $scope.party.name
		});
		$scope.data = dataService.getData();
		dataService.updateParty($scope.party.name);
		dataService.updateFilters($scope.filters);
		console.log($route);
	});
}