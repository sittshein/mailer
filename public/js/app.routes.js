// inject ngRoute for all our routing needs
angular.module('routerRoutes', ['ngRoute'])
	// configure our routes
	.config(function($routeProvider, $locationProvider) {
		$routeProvider
			
			.when('/', {
				templateUrl:  'views/pages/home.html',
				controller:   'homeCtrl'
			})

			.when('/contact', {
				templateUrl	: 'views/pages/contact.html',
				controller  : 'contactCtrl'
			});

		$locationProvider.html5Mode(true);
	});