(function () {
	'use strict';

	angular
		.module('ngInterview.students')
		.controller('StudentsController', StudentsController);

	StudentsController.$inject = ['StudentsService'];
	function StudentsController(StudentsService) {

		/**
		 * Model
		 */

		var vm = this;

		vm.students = null;
		vm.error = null;
		vm.search = null;
		vm.loadStudents = loadStudents;

		/**
		 * Initialization
		 */

		activate();

		/**
		 * Implementations
		 */

		function activate() {
			// Initialization code goes here
			
			loadStudents();
		}

		function loadStudents() {
			vm.error = null;

			return StudentsService.getStudents()
				.then(function (students) {
					vm.students = students;
				})
				.catch(function (response) {
					vm.error = response.data.description;
					vm.students = [];
				});
		}
	}
})();