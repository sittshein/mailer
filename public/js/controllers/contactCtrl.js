app.controller('contactCtrl', ['$scope', function($scope) {

	$scope.message     = 'My Contact List';
	$scope.contactLists = [
		{ name: 'Macbook Pro', email: 'Silver', number: 7 },
		{ name: 'Yoga 2 Pro', email: 'Gray', number: 6 },
		{ name: 'Chromebook', email: 'Black', number: 5 }
	];
	
	$scope.personToAdd = {};  // information that comes from our form

	$scope.addPerson = function() {
		// add a computer to the list
		$scope.contactLists.push({
			name: $scope.personToAdd.name,
			email: $scope.personToAdd.email,
			number: $scope.personToAdd.number
		});
		// after our computer has been added, clear the form
		$scope.personToAdd = {};
	};
	$scope.removePerson = function(index) {
		$scope.contactLists.splice(index, 1);
	};
	
	$scope.predicate = 'name'; // set the default sort type
	$scope.reverse   = false;  // set the default sort order

	$scope.order = function(predicate) {
		$scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
		$scope.predicate = predicate;
	};

}]);