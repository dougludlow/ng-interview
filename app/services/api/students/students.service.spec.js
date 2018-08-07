'use strict';

describe('ngInterview.api.students', function () {

	beforeEach(module('ngInterview.api.students'));

	describe('StudentsService', function () {

		var $httpBackend,
			StudentsService;

		beforeEach(inject(function (_$httpBackend_, _StudentsService_) {
			$httpBackend = _$httpBackend_;
			StudentsService = _StudentsService_;
		}))

		it('should be instantiated', inject(function () {
			expect(StudentsService).toBeDefined();
		}));

		describe('getStudents', function () {

			var handler;

			beforeEach(function () {
				handler = $httpBackend
					.when('GET', '/api/students')
					.respond(200, [{
						"FirstName": "Mia",
						"LastName": "Hernandez",
						"FavoriteFood": "Sandwich",
						"FavoriteColor": "Blue",
						"FavoriteMovie": "Aladdin",
						"Id": 29321
					}]);
			});

			afterEach(function () {
				$httpBackend.verifyNoOutstandingExpectation();
				$httpBackend.verifyNoOutstandingRequest();
			});

			it('should get /api/students', function () {
				$httpBackend.expectGET('/api/students');
				StudentsService.getStudents();
				$httpBackend.flush();
			});

			describe('success', function () {

				var success, 
					error;

				beforeEach(function () {
					success = jasmine.createSpy('success');
					error = jasmine.createSpy('error');

					$httpBackend.expectGET('/api/students');
					StudentsService.getStudents()
						.then(success)
						.catch(error);

					$httpBackend.flush();
				});

				it('should resolve promise', function () {
					expect(success).toHaveBeenCalled();
				});

				it('should not reject promise', function () {
					expect(error).not.toHaveBeenCalled();
				});

				it('should return an array', function () {
					var students = success.calls.first().args[0];
					expect(angular.isArray(students)).toBeTruthy();
				});

			});

			describe('error', function () {

				var success, 
					error;

				beforeEach(function () {
					handler.respond(500, '');

					success = jasmine.createSpy('success');
					error = jasmine.createSpy('error');

					$httpBackend.expectGET('/api/students');
					StudentsService.getStudents()
						.then(success)
						.catch(error);

					$httpBackend.flush();
				});

				it('should not resolve promise', function () {
					expect(success).not.toHaveBeenCalled();
				});

				it('should reject promise', function () {
					expect(error).toHaveBeenCalled();
				});

				it('should not return an array', function () {
					var students = error.calls.first().args[0];
					expect(angular.isArray(students)).toBeFalsy();
				});

				it('should return description', function () {
					var response = error.calls.first().args[0];
					expect(response.data.description).toBe('Failed to load students');
				});

			});

		});

	});

});