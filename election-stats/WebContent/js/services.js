'use strict';

/* Services */

angular.module('esi.services', []).service('menuService', function() {
	var menu = {
		title : ""
	};
	return {
		update : function(m) {
			menu.title = m.title;
		},
		getMenu : function() {
			return menu;
		}
	}
}).service('dataService', function() {
	var data = {
		get: false,
		filters : [],
		party : "",
		state : "",
		election : "",
		constituency : "",
		person: {
			name: "",
			dob: "",
		}
	};
	return {
		updateFilters : function(filters) {
			while (data.filters.pop());
			filters.forEach(function(filter) {
				data.filters.push(filter);
			});
		},
		updateParty : function(party) {
			data.party = party;
		},
		updateState : function(state) {
			data.state = state;
		},
		updateElection : function(election) {
			data.election = election;
		},
		updateConstituency : function(constituency) {
			data.constituency = constituency;
		},
		updateGet: function(get){
			data.get = get;
		},
		updatePerson: function(person){
			data.person = person;
		},
		getData : function() {
			return data;
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
}).factory('Candidates', function($http) {
	var Candidates = function(data) {
		angular.extend(this, data);
	}

	Candidates.get = function(filter) {
		return $http.get('/election-stats/api/candidates', {params: filter}).then(function(response) {
			return new Candidates(response.data);
		});
	};
	return Candidates;
}).factory('Discussions', function($http) {
	var Discussions = function(data) {
		angular.extend(this, data);
	}

	Discussions.get = function(filter, count) {
		return $http.get('/election-stats/api/discussions/' + count, {params: filter}).then(function(response) {
			return new Discussions(response.data);
		});
	};
	return Discussions;
}).factory('List', function($http) {
	var List = function(data) {
		angular.extend(this, data);
	}

	List.get = function(type, para) {
		return $http.get('/election-stats/api/list/' + type, {params: para}).then(function(response) {
			return new List(response.data);
		});
	};
	return List;
});