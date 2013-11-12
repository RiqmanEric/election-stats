'use strict';

/* Controllers */

angular.module('esi.controllers', ["highcharts-ng"]);

function MenuCntl($scope, menuService) {
	$scope.menu = menuService.getMenu();
}

function DataCntl($scope, Candidates, Discussions, dataService){
	$scope.imagesrc = "http://www.cse.iitb.ac.in/~manku/database";
	$scope.data = dataService.getData();
	$scope.candidates = dataService.getCandidates();
	$scope.discussions = dataService.getDiscussions();
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

	$scope.chartConfig = dataService.getChartConfig();
}

function HomeCntl($scope, menuService, dataService, List, $timeout){
	menuService.update({
		title: "Home",
		link: "#"
	});
	dataService.reset();
	$scope.elections = [];
	$scope.states = [];
	$scope.parties = [];
	$scope.constituencies = [];
	$scope.persons = [];

	$scope.election = "Election";
	$scope.state = "State";
	$scope.party = "Party";
	$scope.constituency = {
		state: "State",
		name: "Constituency"
	};
	$scope.person = {
		name:"",
		dob:""
	};

	List.get("election", {}).then(function(elections){
		while($scope.elections.pop());
		elections.list.forEach(function(e){ $scope.elections.push(e)});
		$scope.elections.reverse();
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
		$scope.parties.sort();
	}, function(err){
		menuService.error("Parties list not available.");
	});

	$scope.$watch("constituency.state", function() {
		if($scope.constituency.state!="State"){
			List.get($scope.constituency.state, {}).then(function(constituencies){
				while($scope.constituencies.pop());
				constituencies.list.forEach(function(e){ $scope.constituencies.push(e)});
				$scope.constituencies.sort();
			}, function(err){
				menuService.error("Constituency list not available.");
			});
		}
	});
	$scope.search_string = "";

	var tempText = '', filterTextTimeout;
	var currentKey = 0;
	$scope.$watch('person.name', function (val) {
		if (filterTextTimeout) $timeout.cancel(filterTextTimeout);
		tempText = val;
		filterTextTimeout = $timeout(function() {
			currentKey = currentKey +1;
			$scope.search_string = val;
			if($scope.search_string=="") return;
			List.search($scope.search_string, currentKey).then(function(data){
				if(data.key==currentKey){
					console.log(data.list);
					while($scope.persons.pop());
					data.list.forEach(function(e){
						$scope.persons.push(e);
					});
				}
			}, function(data){
				console.log(data.config.key);
			});
		}, 500);
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
		dataService.updateChartFunction(function(chartConfig, candidates, data){
			chartConfig.title.text = data.party + "Win/Lose <br>" + data.state + ", " + data.election;
			chartConfig.series[0].name = "Total";
			while(chartConfig.series[0].data.pop());
			var won = 0, lost = 0;
			candidates.forEach(function(candidate){
				if(candidate.result == "Lost") lost = lost+1;
				else won = won+1;
			});
			chartConfig.series[0].data.push({
				name: "Won",
				y: won
			});
			chartConfig.series[0].data.push({
				name: "Lost",
				y: lost
			});
		});

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
		dataService.updateChartFunction(function(chartConfig, candidates, data){
			chartConfig.title.text = data.state + "<br> " + data.constituency + ", " + data.election;
			chartConfig.series[0].name = "Votes";
			while(chartConfig.series[0].data.pop());
			candidates.forEach(function(candidate){
				chartConfig.series[0].data.push({
					name: String(candidate.person.name).substring(0, 20),
					y: Number(candidate.votes)
				});
			});
		});
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
		dataService.updateChartFunction(function(chartConfig, candidates, data){
			chartConfig.title.text = data.constituency + ", " + data.state + ", " + data.election;
			chartConfig.series[0].name = "Votes";
			while(chartConfig.series[0].data.pop());
			candidates.forEach(function(candidate){
				chartConfig.series[0].data.push({
					name: String(candidate.person.name).substring(0, 20),
					y: Number(candidate.votes)
				});
			});
		});

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
		dataService.updateChartFunction(function(chartConfig, candidates, data){
			chartConfig.title.text = data.person.name + "Win/Lose";
			chartConfig.series[0].name = "Total";
			while(chartConfig.series[0].data.pop());
			var won = 0, lost = 0;
			candidates.forEach(function(candidate){
				if(candidate.result == "Lost") lost = lost+1;
				else won = won+1;
			});
			chartConfig.series[0].data.push({
				name: "Won",
				y: won
			});
			chartConfig.series[0].data.push({
				name: "Lost",
				y: lost
			});
		});
		dataService.updateGet(true);
		$scope.data = dataService.getData();
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

function ElectionCntl($scope, $route, Election, List, menuService, dataService){
	$scope.imagesrc = "http://www.cse.iitb.ac.in/~manku/database";
	dataService.reset();
	Election.get($route.current.params.electionyear).then(function(e){
		$scope.election = e;
		$scope.filters = [];
		menuService.update({
			title: $scope.election.name + "th Loksabha",
			link: "#/election/" + $scope.election.year
		});
		dataService.updateElection($scope.election.year);
		dataService.updateGet(true);
		dataService.updateChartFunction(function(chartConfig, candidates, data){
			chartConfig.title.text = $scope.election.name + "th Loksabha <br>" + data.constituency + ", " + data.state;
			chartConfig.series[0].name = "Votes";
			while(chartConfig.series[0].data.pop());
			candidates.forEach(function(candidate){
				chartConfig.series[0].data.push({
					name: String(candidate.person.name).substring(0, 20),
					y: Number(candidate.votes)
				});
			});
		});

		List.get("state", {}).then(function(states){
			$scope.filters.push({
				type: "state",
				values: states.list.sort(),
				value: states.list[0]
			});
			dataService.updateFilters($scope.filters);
			List.get($scope.filters[0].value, {}).then(function(constituencies){
				$scope.filters.push({
					type: "constituency",
					values: constituencies.list.sort(),
					value: constituencies.list[0]
				});
				dataService.updateFilters($scope.filters);
				$scope.$watch("filters[0].value", function() {
					List.get($scope.filters[0].value, {}).then(function(constituencies){
						$scope.filters.splice(1,1);
						$scope.filters.push({
							type: "constituency",
							values: constituencies.list.sort(),
							value: constituencies.list[0]
						});
						dataService.updateFilters($scope.filters);
					}, function(err){
						menuService.error("Constituency list not available.");
					});
				});
			}, function(err){
				menuService.error("Constituency list not available.");
			});
		}, function(err){
			menuService.error("Elections list not available.");
		});


	}, function(err){
		menuService.error($route.current.params.electionyear + " is not a valid year.");
	});
}

function StatsCntl($scope, menuService, List, Stats, $timeout, dataService){
	$scope.imagesrc = "http://www.cse.iitb.ac.in/~manku/database";
	dataService.reset();
	menuService.update({
		title: "Statistics",
		link: "#/stats/"
	});
	$scope.filters = [
		{
			title: "Elections",
			values:[],
			count: 0,
		},
		{
			title: "States",
			values:[],
			count: 0,
		},
		{
			title: "Parties",
			values:[],
			count:0,
		}
	];
	$scope.attribs = ["winners", "femaleCandidates", "votePercentage"];
	$scope.attribute = "winners";
	$scope.data = [];
	List.get("election", {}).then(function(elections){
		while($scope.filters[0].values.pop());
		elections.list.reverse();
		elections.list.forEach(function(e){ $scope.filters[0].values.push({value: e, isChecked: false})});
	}, function(err){
		menuService.error("Elections list not available.");
	});

	List.get("state", {}).then(function(states){
		while($scope.filters[1].values.pop());
		states.list.sort();
		states.list.forEach(function(e){ $scope.filters[1].values.push({value: e, isChecked: false})});
	}, function(err){
		menuService.error("States list not available.");
	});

	List.get("party", {}).then(function(parties){
		while($scope.filters[2].values.pop());
		parties.list.sort();
		parties.list.forEach(function(e){$scope.filters[2].values.push({value: e, isChecked: false})});
	}, function(err){
		menuService.error("Parties list not available.");
	});
	$scope.checkbox = function(choice, f){
		$timeout(function(){
			choice.isChecked = !choice.isChecked;
			if(choice.isChecked) f.count = f.count+1;
			else f.count = f.count-1;
		},0);
	}
	$scope.radio = function(attribute){
		$scope.attribute = $scope.attribs[attribute];
		var election = [];
		var state = [];
		var party = [];
		$scope.filters[0].values.forEach(function(v){
			if(v.isChecked) election.push(v.value);
		});
		$scope.filters[1].values.forEach(function(v){
			if(v.isChecked) state.push(v.value);
		});
		$scope.filters[2].values.forEach(function(v){
			if(v.isChecked) party.push(v.value);
		});
		election = (election.length>0? election:[""]);
		state = (state.length>0? state:[""]);
		party = (party.length>0? party:[""]);
		Stats.get($scope.attribute,{
			year: election,
			state: state,
			party: party
		}).then(function(data){
			while($scope.data.pop());
			data.list.forEach(function(e){
				$scope.data.push({
					year: Number(e.year),
					state: e.state,
					party: e.party,
					count: Number(e.count)
				});
			});
		});
	}

}