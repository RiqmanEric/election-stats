'use strict';

/* Services */

angular.module('esi.services', ['ngCookies']).service('menuService', function() {
	var menu = {
		title: "",
		link: "#",
		alert: {
			show: false,
			content: ""
		},
		checkLogin: false,
		user: {
			username:"",
			email:""
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
			menu.title = "";
			menu.link = "#";
			menu.alert.show = true;
			menu.alert.content = msg;
		},
		getMenu: function() {
			return menu;
		},
		setUser: function(u){
			menu.user.username = u.username;
			menu.user.email = u.email;
			menu.checkLogin = true;
		},
		unSetUser: function(){
			menu.user = {
				username: "",
				email: ""
			};
			menu.checkLogin = false;
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
	var chartConfig = {
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false
		},
		title: {
			text: ''
		},
		tooltip: {
			pointFormat: '{series.name}: <b>{point.percentage:.1f}</b>'
		},
		series: [{
			type: 'pie',
			name: '',
			data: [],
			allowPointSelect: true,
			cursor: 'pointer',
			dataLabels: {
				enabled: true,
				color: '#000000',
				connectorColor: '#000000',
				format: '{point.name}: {point.percentage:.1f}%'
			}
		}]
	}
	var chartFunc = function(chartConfig, candidates, data){
	}
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
		getDiscussions: function() {
			return discussions;
		},
		getCandidates: function(){
			return candidates;
		},
		getChartConfig: function(){
			return chartConfig;
		},
		updateChartFunction: function(func){
			chartFunc = func;
		},
		updateCandidates: function(cand) {
			while (candidates.pop());
			cand.candidates.forEach(function(c) {
				candidates.push(c);
			});
			chartFunc(chartConfig,cand.candidates, data);
		},
		updateDiscussions: function(disc) {
			while (discussions.pop());
			disc.discussions.forEach(function(d) {
				discussions.push(d);
			});
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
			chartConfig.title.text = "";
			chartConfig.series[0].name = "";
			chartFunc = function(chartConfig, candidates, data){}
			while(candidates.pop());
			while(discussions.pop());
			while(chartConfig.series[0].data.pop());
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
}).factory('Election', function($http) {
	var Election = function(data) {
		angular.extend(this, data);
	}

	Election.get = function(year) {
		return $http.get('/election-stats/api/election/' + year).then(function(response) {
			return new Election({
				year: year,
				name: response.data
			});
		});
	};
	return Election;
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
}).factory('List', function($http, $cacheFactory, $q) {
	var List = function(data) {
		angular.extend(this, data);
	}
	var cache = $cacheFactory('election-stats');
	List.get = function(type, para) {
		if(cache.get(type)){
			var deferred = $q.defer();
			var promise = deferred.promise;
			deferred.resolve(cache.get(type));
			return promise;
		}
		return $http.get('/election-stats/api/list/' + type, {params: para}).then(function(response) {
			cache.put(type, {list: response.data});
			return new List({list: response.data});
		});
	};
	List.search = function(searchkey, currentKey) {
		return $http.get('/election-stats/api/search/' + searchkey, { key:currentKey}).then(function(response) {
			return new List({list: response.data, key: response.config.key});
		});
	};
	return List;
}).factory('Stats', function($http) {
	var Stats = function(data) {
		angular.extend(this, data);
	}

	Stats.get = function(type, para) {
		var p = $.param(para);
		p = p.split("%5B").join("");
		p = p.split("%5D").join("");
		return $http.get('/election-stats/api/stats/' + type+"?"+p).then(function(response) {
			return new Stats({list: response.data});
		});
	};
	return Stats;
}).service('Login', function ($http, $rootScope, $q, $cookieStore) {
	var clientId = '414328947017.apps.googleusercontent.com',
		scopes = 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
		domain = '',
		deferred = $q.defer();
	this.login = function () {
		if($cookieStore.get("email") && $cookieStore.get("username")){
			var deferred1 = $q.defer();
			deferred1.resolve({
				email: $cookieStore.get("email"),
				username: $cookieStore.get("username")
			});
			return deferred1.promise;
		}
		gapi.auth.authorize({ client_id: clientId, scope: scopes, immediate: false, hd: domain }, this.handleAuthResult);
		return deferred.promise;
	};

	this.checkAuth = function() {
		var deferred1 = $q.defer();
		if($cookieStore.get("email") && $cookieStore.get("username")){
			deferred1.resolve({
				email: $cookieStore.get("email"),
				username: $cookieStore.get("username")
			});
			return deferred1.promise;
		}else{
			deferred1.reject('error');
			return deferred1.promise;
		}
	};

	this.handleAuthResult = function(authResult) {
		if (authResult && !authResult.error) {
			var data = {};
			gapi.client.load('oauth2', 'v2', function () {
				var request = gapi.client.oauth2.userinfo.get();
				request.execute(function (resp) {
					$rootScope.$apply(function () {
						data.email = resp.email;
						data.username = resp.name;
					});
					$cookieStore.put("email", resp.email);
					$cookieStore.put("username", resp.name);
					console.log(data);
				});
			});
			deferred.resolve(data);
		} else {
			deferred.reject('error');
		}
	};

	this.handleAuthClick = function (event) {
		gapi.auth.authorize({ client_id: clientId, scope: scopes, immediate: false, hd: domain }, this.handleAuthResult );
		return false;
	};

});