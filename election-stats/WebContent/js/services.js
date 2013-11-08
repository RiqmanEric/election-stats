'use strict';

/* Services */

angular.module('esi.services', []).service('menuService', function() {
	var menu = {
		title: "",
		link: "#",
		alert: {
			show: false,
			content: ""
		}
	};
	return {
		update: function(m) {
			menu.title = m.title;
			menu.link = m.link;
			menu.alert.show = false;
			menu.alert.content = "";
		},
		error: function(msg){
			menu.alert.show = true;
			menu.alert.content = msg;
		},
		getMenu: function() {
			return menu;
		}
	}
}).service('dataService', function() {
	var data = {
		get: false,
		filters: [],
		party: "",
		state: "",
		election: "",
		constituency: "",
		person: {
			name: "",
			dob: "",
		}
	};
	var candidates = [];
	var discussions = [];
	return {
		updateFilters: function(filters) {
			while (data.filters.pop());
			filters.forEach(function(filter) {
				data.filters.push(filter);
			});
		},
		updateParty: function(party) {
			data.party = party;
		},
		updateState: function(state) {
			data.state = state;
		},
		updateElection: function(election) {
			data.election = election;
		},
		updateConstituency: function(constituency) {
			data.constituency = constituency;
		},
		updateGet: function(get){
			data.get = get;
		},
		updatePerson: function(person){
			data.person = person;
		},
		getData: function() {
			return data;
		},
		updateCandidates: function(cand) {
			while (candidates.pop());
			cand.candidates.forEach(function(c) {
				candidates.push(c);
			});
		},
		updateDiscussions: function(disc) {
			while (discussions.pop());
			disc.discussions.forEach(function(d) {
				discussions.push(d);
			});
		},
		getDiscussions: function() {
			return discussions;
		},
		getCandidates: function(){
			return candidates;
		},
		reset: function(){
			data.get = false;
			while (data.filters.pop());
			data.party = "";
			data.state = "";
			data.election = "";
			data.constituency = "";
			data.person.name = "";
			data.person.dob = "";
			while(candidates.pop());
			while(discussions.pop());
		}
	};
}).factory('Party', function($http) {
	var Party = function(data) {
		angular.extend(this, data);
	}

	Party.get = function(name) {
		return $http.get('/election-stats/api/party/' + name).then(function(response) {
			return new Party(response.data);
		});
	};
	return Party;
}).factory('State', function($http) {
	var State = function(data) {
		angular.extend(this, data);
	}

	State.get = function(name) {
		return $http.get('/election-stats/api/state/' + name).then(function(response) {
			return new State(response.data);
		});
	};
	return State;
}).factory('Person', function($http) {
	var Person = function(data) {
		angular.extend(this, data);
	}

	Person.get = function(name,dob) {
		return $http.get('/election-stats/api/person/' + name+"/"+dob).then(function(response) {
			return new Person(response.data);
		});
	};
	return Person;
}).factory('Constituency', function($http) {
	var Constituency = function(data) {
		angular.extend(this, data);
	}

	Constituency.get = function(statename,name) {
		return $http.get('/election-stats/api/constituency/' + statename+"/"+name).then(function(response) {
			return new Constituency(response.data);
		});
	};
	return Constituency;
}).factory('Candidates', function($http) {
	var Candidates = function(data) {
		angular.extend(this, data);
	}

	Candidates.get = function(filter) {
		return $http.get('/election-stats/api/candidate', {params: filter}).then(function(response) {
			return new Candidates({candidates: response.data});
		});
	};
	return Candidates;
}).factory('Discussions', function($http) {
	var Discussions = function(data) {
		angular.extend(this, data);
	}

	Discussions.get = function(filter, count) {
		return $http.get('/election-stats/api/discussion/' + count, {params: filter}).then(function(response) {
			return new Discussions({discussions: response.data});
		});
	};
	return Discussions;
}).factory('List', function($http) {
	var List = function(data) {
		angular.extend(this, data);
	}

	List.get = function(type, para) {
		return $http.get('/election-stats/api/list/' + type, {params: para}).then(function(response) {
			return new List({list: response.data});
		});
	};
	return List;
});