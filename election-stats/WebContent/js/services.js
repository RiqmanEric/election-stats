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
		filters : [],
		party : "",
		state : "",
		election : "",
		constituency : ""
	};
	return {
		updateFilters : function(filters) {
			while (data.filters.pop())
				;
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
		getData : function() {
			console.log(data);
			return data;
		}
	};
}).factory('Party', function($http) {
	var Party = function(data) {
		angular.extend(this, data);
	}

	Party.get = function(name) {
		console.log("he" + name);
		return $http.get('/election-stats/api/party/' + name).then(function(response) {
			return new Party(response.data);
		});
	};
	return Party;
});