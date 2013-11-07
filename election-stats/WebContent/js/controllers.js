'use strict';

/* Controllers */

angular.module('esi.controllers', []);

function MenuCntl($scope, menuService) {
	$scope.menu = menuService.getMenu();
}

function DataCntl($scope, Candidates, Discussions, dataService){

	$scope.data = dataService.getData();
	$scope.candidates = [
		{
			name: "Atal Bihari",
			state: "Uttarprdesh",
			constituency: "Lucknow",
			vote: "901002",
			votePercent: "20%",
			result: "Won",
			image: "atalji.jpg"
		},
		{
			name: "Atal Bihari2",
			state: "Uttarprdesh",
			constituency: "Lucknow",
			vote: "901002",
			votePercent: "20%",
			result: "Won",
			image: "atalji.jpg"
		},
		{
			name: "Atal Bihari3",
			state: "Uttarprdesh",
			constituency: "Lucknow",
			vote: "901002",
			votePercent: "20%",
			result: "Won",
			image: "atalji.jpg"
		},
		{
			name: "Atal Bihari3",
			state: "Uttarprdesh",
			constituency: "Lucknow",
			vote: "901002",
			votePercent: "20%",
			result: "Won",
			image: "atalji.jpg"
		},
	];
	$scope.discussions = [
		{
			content: "Bacon ipsum dolor sit amet nulla ham qui sint exercitation eiusmod commodo, chuck duis velit. Aute in reprehenderit, dolore aliqua non est magna in labore pig pork biltong.",
			user: "Someone",
			comments: [
				{
					content: "com1 Bacon ipsum dolor sit amet nulla ham qui sint exercitation eiusmod commodo, chuck duis velit. Aute in reprehenderit, dolore aliqua non est magna in labore pig pork biltong.",
					user: "Someone",
					comments: 0,
				},
				{
					content: "com2 Bacon ipsum dolor sit amet nulla ham qui sint exercitation eiusmod commodo, chuck duis velit. Aute in reprehenderit, dolore aliqua non est magna in labore pig pork biltong.",
					user: "Someone",
					comments: 0,
				}
			]
		},
		{
			content: "dis2 Bacon ipsum dolor sit amet nulla ham qui sint exercitation eiusmod commodo, chuck duis velit. Aute in reprehenderit, dolore aliqua non est magna in labore pig pork biltong.",
			user: "Someone",
			comments: [
				{
					content: "com3 Bacon ipsum dolor sit amet nulla ham qui sint exercitation eiusmod commodo, chuck duis velit. Aute in reprehenderit, dolore aliqua non est magna in labore pig pork biltong.",
					user: "Someone",
					comments: [
						{
							content: "com31 sBacon ipsum dolor sit amet nulla ham qui sint exercitation eiusmod commodo, chuck duis velit. Aute in reprehenderit, dolore aliqua non est magna in labore pig pork biltong.",
							user: "Someone",
							comments: [
								{
									content: "com3 Bacon ipsum dolor sit amet nulla ham qui sint exercitation eiusmod commodo, chuck duis velit. Aute in reprehenderit, dolore aliqua non est magna in labore pig pork biltong.",
									user: "Someone",
									comments: [
										{
											content: "com31 sBacon ipsum dolor sit amet nulla ham qui sint exercitation eiusmod commodo, chuck duis velit. Aute in reprehenderit, dolore aliqua non est magna in labore pig pork biltong.",
											user: "Someone",
											comments: 0,
										}
									]
								}
							]
						}
					]
				}
			]
		}
	];
	if($scope.data.get){
		var candidatePromise = Candidates.get({
			election: $scope.data.election,
			state: $scope.data.state,
			constituency: $scope.data.constituency,
			party: $scope.data.party,
			personname: $scope.data.person.name,
			persondob: $scope.data.person.dob,
		});
		candidatePromise.then(updateCandidates);
	}
	var discussionPromise = Discussions.get({
		election: $scope.data.election,
		state: $scope.data.state,
		constituency: $scope.data.constituency,
		party: $scope.data.party,
		personname: $scope.data.person.name,
		persondob: $scope.data.person.dob,
	}, 0);
	discussionPromise.then(updateDiscussion);

	$scope.filter = function(){
		$scope.data.filters.forEach(function(filter){
			if(filter.type == "election")
				$scope.data.election = filter.value;
			if(filter.type == "state")
				$scope.data.state = filter.value;
			if(filter.type == "party")
				$scope.data.party = filter.value;
			if(filter.type == "constituency")
				$scope.data.constituency = filter.value;
			if(filter.type == "person")
				$scope.data.person = filter.value;
		});
		if($scope.data.get){
			var candidatePromise = Candidates.get({
				election: $scope.data.election,
				state: $scope.data.state,
				constituency: $scope.data.constituency,
				party: $scope.data.party,
				personname: $scope.data.person.name,
				persondob: $scope.data.person.dob,
			}, 0);
			candidatePromise.then(updateCandidates);
		}
		var discussionPromise = Discussions.get({
			election: $scope.data.election,
			state: $scope.data.state,
			constituency: $scope.data.constituency,
			party: $scope.data.party,
			personname: $scope.data.person.name,
			persondob: $scope.data.person.dob,
		});
		discussionPromise.then(updateDiscussion);
	}
	var updateCandidates = function(candidates){
		console.log("ADF");
		while ($scope.candidates.pop());
		data.candidates.forEach(function(candidate) {
			$scope.candidates.push(candidate);
		});
	}
	var updateDiscussion = function(discussions){
		while ($scope.discussions.pop());
		data.discussions.forEach(function(discussion) {
			$scope.discussions.push(discussion);
		});
	}

}

function HomeCntl($scope, menuService, dataService){
	menuService.update({
		title: "Home"
	});
	dataService.updateParty("");
	dataService.updateState("");
	dataService.updateElection("");
	dataService.updateConstituency("");
	dataService.updateFilters([]);
	dataService.updateGet(false);
}

function PartyCntl($scope, $route, Party, List, menuService, dataService){
	var partyPromise = Party.get($route.current.params.partyname);
	partyPromise.then(function(p){
		$scope.party = p;
		$scope.filters = [];
		var filterPromiseE = List.get("election", {});
		filterPromiseE.then(function(elections){
			$scope.filters.push({
				type: "election",
				values: elections,
				value: elections[0]
			});
			dataService.updateFilters($scope.filters);
			var filterPromiseS = List.get("state", {});
			filterPromiseS.then(function(states){
				$scope.filters.push({
					type: "state",
					values: states,
					value: states[0]
				});
				dataService.updateFilters($scope.filters);
			});
		});

		menuService.update({
			title: $scope.party.name
		});
		dataService.updateParty($scope.party.name);
		dataService.updateGet(true);
	});
}

function StateCntl($scope, $route, State, List, menuService, dataService){
	var statePromise = State.get($route.current.params.statename);
	statePromise.then(function(s){
		$scope.state = s;
		$scope.filters = [];
		var filterPromiseE = List.get("election", {});
		filterPromiseE.then(function(elections){
			$scope.filters.push({
				type: "election",
				values: elections,
				value: elections[0]
			});
			dataService.updateFilters($scope.filters);
			var filterPromiseS = List.get(s.name, {});
			filterPromiseS.then(function(constituency){
				$scope.filters.push({
					type: "constituency",
					values: constituency,
					value: constituency[0]
				});
				dataService.updateFilters($scope.filters);
			});
		});

		menuService.update({
			title: $scope.state.name
		});
		dataService.updateState($scope.state.name);
		dataService.updateGet(true);
	});
}

function ConstituencyCntl($scope, $route, Constituency, List, menuService, dataService){
	var constituencyPromise = Constituency.get($route.current.params.statename,$route.current.params.constituencyname);
	constituencyPromise.then(function(c){
		$scope.constituency = c;
		$scope.filters = [];
		var filterPromiseE = List.get("election", {});
		filterPromiseE.then(function(elections){
			$scope.filters.push({
				type: "election",
				values: elections,
				value: elections[0]
			});
			dataService.updateFilters($scope.filters);
		});

		menuService.update({
			title: $scope.constituency.name
		});
		dataService.updateConstituency($scope.constituency.name);
		dataService.updateState($scope.constituency.state.name);
		dataService.updateGet(true);
	});
}
function PersonCntl($scope, $route, Person, List, menuService, dataService){
	var personPromise = Person.get($route.current.params.personname,$route.current.params.dob);
	personPromise.then(function(p){
		$scope.person = p;
		$scope.filters = [];
		menuService.update({
			title: $scope.person.name
		});
		dataService.updatePerson({
			name: $scope.person.name,
			dob: $scope.person.dob

		});
		dataService.updateGet(true);
	});
}