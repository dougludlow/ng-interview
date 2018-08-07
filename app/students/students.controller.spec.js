'use strict';

describe('ngInterview.students', function () {

	var $controller,
		$rootScope,
		$q,
		StudentsService = {
			getStudents: jasmine.createSpy('getStudents')
		};

	beforeEach(function () {
		module('ngInterview.students', function ($provide) {
			$provide.service('StudentsService', function () {
				return StudentsService;
			})
		});
		inject(function (_$controller_, _$rootScope_, _$q_) {
			$controller = _$controller_;
			$rootScope = _$rootScope_;
			$q = _$q_
		});
	});

	describe('StudentsController', function () {

		it('should instantiate', function () {
			StudentsService.getStudents.and.returnValue($q.resolve([]));
			var ctrl = $controller('StudentsController');
			expect(ctrl).toBeDefined();
		});

		it('should attempt to load students on init', function () {
			StudentsService.getStudents.and.returnValue($q.resolve([{
				"FirstName": "Mia",
				"LastName": "Hernandez",
				"FavoriteFood": "Sandwich",
				"FavoriteColor": "Blue",
				"FavoriteMovie": "Aladdin",
				"Id": 29321
			}]));
			var ctrl = $controller('StudentsController');
			$rootScope.$apply();

			expect(StudentsService.getStudents).toHaveBeenCalled();
			expect(ctrl.students).toEqual([{
				"FirstName": "Mia",
				"LastName": "Hernandez",
				"FavoriteFood": "Sandwich",
				"FavoriteColor": "Blue",
				"FavoriteMovie": "Aladdin",
				"Id": 29321
			}]);
		});

		it('should set error if students fail to load', function () {
			StudentsService.getStudents.and.returnValue($q.reject({ data: {
				description: 'ERROR'
			}}));
			var ctrl = $controller('StudentsController');
			$rootScope.$apply();

			expect(ctrl.error).toBe('ERROR');
			expect(ctrl.students).toEqual([]);
		});
	});

});