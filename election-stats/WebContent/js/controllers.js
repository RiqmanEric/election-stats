'use strict';

/* Controllers */

angular.module('esi.controllers', []);

function MenuCntl($scope, menuService) {
	$scope.menu = menuService.getMenu();
}

function DataCntl($scope, Candidates, Discussions, dataService){
	$scope.imagesrc = "http://www.cse.iitb.ac.in/~manku/database";
	$scope.data = dataService.getData();
	$scope.candidates = dataService.getCandidates();
	$scope.discussions = dataService.getDiscussions();
	dataService.updateDiscussions({
		discussions: [
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
	]});
	if($scope.data.get){
		Candidates.get({
			election: $scope.data.election,
			state: $scope.data.state,
			constituency: $scope.data.constituency,
			party: $scope.data.party,
			personname: $scope.data.person.name,
			persondob: $scope.data.person.dob,
		}).then(dataService.updateCandidates);
	}
	Discussions.get({
		election: $scope.data.election,
		state: $scope.data.state,
		constituency: $scope.data.constituency,
		party: $scope.data.party,
		personname: $scope.data.person.name,
		persondob: $scope.data.person.dob,
	}, 0).then(dataService.updateDiscussion);

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
			Candidates.get({
				election: $scope.data.election,
				state: $scope.data.state,
				constituency: $scope.data.constituency,
				party: $scope.data.party,
				personname: $scope.data.person.name,
				persondob: $scope.data.person.dob,
			}).then(dataService.updateCandidates);
		}
		Discussions.get({
			election: $scope.data.election,
			state: $scope.data.state,
			constituency: $scope.data.constituency,
			party: $scope.data.party,
			personname: $scope.data.person.name,
			persondob: $scope.data.person.dob,
		},0).then(dataService.updateDiscussion);
	}
}

function HomeCntl($scope, menuService, dataService, List){
	menuService.update({
		title: "Home",
		link: "#"
	});
	dataService.reset();
	$scope.elections = [];
	$scope.states = [];
	$scope.parties = [];
	$scope.constituencies = [];

	$scope.election = "Election";
	$scope.state = "State";
	$scope.party = "Party";
	$scope.constituency = {
		state: "State",
		name: "Constituency"
	}

	List.get("election", {}).then(function(elections){
		while($scope.elections.pop());
		elections.list.forEach(function(e){ $scope.elections.push(e)});
	}, function(err){
		menuService.error("Elections list not available.");
	});

	List.get("state", {}).then(function(states){
		while($scope.states.pop());
		states.list.forEach(function(e){ $scope.states.push(e)});
		$scope.states.sort();
	}, function(err){
		menuService.error("States list not available.");
	});

	List.get("party", {}).then(function(parties){
		while($scope.parties.pop());
		parties.list.forEach(function(e){ $scope.parties.push(e)});
	}, function(err){
		menuService.error("Parties list not available.");
	});

	$scope.$watch("constituency.state", function() {
		if($scope.constituency.state!="State"){
	        List.get($scope.constituency.state, {}).then(function(constituencies){
				while($scope.constituencies.pop());
				constituencies.list.forEach(function(e){ $scope.constituencies.push(e)});
			}, function(err){
				menuService.error("Constituency list not available.");
			});
	    }
    });
}

function PartyCntl($scope, $route, Party, List, menuService, dataService){
	$scope.imagesrc = "http://www.cse.iitb.ac.in/~manku/database";
	dataService.reset();
	Party.get($route.current.params.partyname).then(function(p){
		$scope.party = p;
		$scope.filters = [];
		menuService.update({
			title: $scope.party.name,
			link: "#/party/" + $scope.party.name
		});
		dataService.updateParty($scope.party.name);
		dataService.updateGet(true);

		List.get("election", {}).then(function(elections){
			$scope.filters.push({
				type: "election",
				values: elections.list.reverse(),
				value: elections.list[0]
			});
			dataService.updateFilters($scope.filters);
			List.get("state", {}).then(function(states){
				$scope.filters.push({
					type: "state",
					values: states.list.sort(),
					value: states.list[0]
				});
				dataService.updateFilters($scope.filters);
			}, function(err){
				menuService.error("State list not available.");
			});
		}, function(err){
			menuService.error("Elections list not available");
		});
	}, function(err){
		menuService.error($route.current.params.partyname + " is not a valid party.");
	});
}

function StateCntl($scope, $route, State, List, menuService, dataService){
	$scope.imagesrc = "http://www.cse.iitb.ac.in/~manku/database";
	dataService.reset();
	State.get($route.current.params.statename).then(function(s){
		$scope.state = s;
		$scope.filters = [];
				menuService.update({
			title: $scope.state.name,
			link: "#/state/" + $scope.state.name
		});
		dataService.updateState($scope.state.name);
		dataService.updateGet(true);

		List.get("election", {}).then(function(elections){
			$scope.filters.push({
				type: "election",
				values: elections.list.reverse(),
				value: elections.list[0]
			});
			dataService.updateFilters($scope.filters);
			List.get(s.name, {}).then(function(constituency){
				$scope.filters.push({
					type: "constituency",
					values: constituency.list.sort(),
					value: constituency.list[0]
				});
				dataService.updateFilters($scope.filters);
			}, function(err){
				menuService.error("Constituency list not available.");
			});
		}, function(err){
			menuService.error("Elections list not available.");
		});
	}, function(err){
		menuService.error($route.current.params.statename + " is not a valid state.");
	});
}

function ConstituencyCntl($scope, $route, Constituency, List, menuService, dataService){
	$scope.imagesrc = "http://www.cse.iitb.ac.in/~manku/database";
	dataService.reset();
	Constituency.get($route.current.params.statename,$route.current.params.constituencyname).then(function(c){
		$scope.constituency = c;
		$scope.filters = [];
		menuService.update({
			title: $scope.constituency.name,
			link: "#/constituency/" + $scope.constituency.state + "/" + $scope.constituency.name
		});
		dataService.updateConstituency($scope.constituency.name);
		dataService.updateState($scope.constituency.state);
		dataService.updateGet(true);

		List.get("election", {}).then(function(elections){
			$scope.filters.push({
				type: "election",
				values: elections.list.reverse(),
				value: elections.list[0]
			});
			dataService.updateFilters($scope.filters);
		}, function(err){
			menuService.error("Elections list not available.");
		});

	}, function(err){
		menuService.error($route.current.params.constituencyname + ", " + $route.current.params.statename + " is not a valid constituency.");
	});
}
function PersonCntl($scope, $route, Person, List, menuService, dataService, Candidates, Discussions){
	$scope.imagesrc = "http://www.cse.iitb.ac.in/~manku/database";
	dataService.reset();
	Person.get($route.current.params.personname,$route.current.params.dob).then(function(p){
		$scope.person = p;
		$scope.filters = [];
		menuService.update({
			title: $scope.person.name,
			link: "#/person/" + $scope.person.name
		});
		dataService.updatePerson({
			name: $scope.person.name,
			dob: $scope.person.dob

		});
		dataService.updateGet(true);
		$scope.data = dataService.getData();
		console.log($scope.data);
		if($scope.data.get){
			Candidates.get({
				election: $scope.data.election,
				state: $scope.data.state,
				constituency: $scope.data.constituency,
				party: $scope.data.party,
				personname: $scope.data.person.name,
				persondob: $scope.data.person.dob,
			}).then(dataService.updateCandidates);
		}
		Discussions.get({
			election: $scope.data.election,
			state: $scope.data.state,
			constituency: $scope.data.constituency,
			party: $scope.data.party,
			personname: $scope.data.person.name,
			persondob: $scope.data.person.dob,
		}, 0).then(dataService.updateDiscussion);
	}, function(err){
		menuService.error($route.current.params.personname + " - " + $route.current.params.dob + " is not a valid person.");
	});
}