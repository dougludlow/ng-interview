(function () {
	'use strict';

	angular
		.module('ngInterview.api.students')
		.service('StudentsService', StudentsService);

	StudentsService.$inject = ['$http', '$q'];
	function StudentsService($http, $q) {

		/**
		 * Exposed functions
		 */

		this.getName = getName; // This function serves no purpose. It's just here as an example.
		this.getStudents = getStudents;

		/**
		 * Implementations
		 */

		function getName() {
			return 'studentsService';
		}

		function getStudents() {
			return $http.get('/api/students', {
					responseType: 'json'
				})
				.then(requestCompleted)
				.catch(requestFailed('students'));
		}

		function requestCompleted(response) {
			// If the response wasn't formatted correctly
			if (response.data === null) {
				return $q.reject(response);
			}
			return response.data;
		}

		function requestFailed(requestName) {
			return function (response) {
				var newMessage = 'Failed to load ' + requestName;
				if (response.data && response.data.description) {
					newMessage = newMessage + '\n' + response.data.description;
				}
				response.data = {
					description: newMessage
				};
				return $q.reject(response);
			}
		}
	}

})();