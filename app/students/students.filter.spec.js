'use strict';

describe('ngInterview.students', function () {

    var filter, students, student1, student2;

    beforeEach(function () {
        module('ngInterview.students');
        inject(function ($filter) {
            filter = $filter('students');
        });

        student1 = {
            "FirstName": "Charlotte",
            "LastName": "Garcia",
            "FavoriteFood": "Chicken nuggets",
            "FavoriteColor": "Brown",
            "FavoriteMovie": "Star Wars Episode 1",
            "Id": 11295
        };

        student2 = {
            "FirstName": "Abigail",
            "LastName": "Taylor",
            "FavoriteFood": "Pie",
            "FavoriteColor": "Black",
            "FavoriteMovie": "The Rescuers",
            "Id": 17553
        };

        students = [student1, student2];
    });

    describe('studentsFilter', function () {

        it('should instantiate', function () {
            expect(filter).toBeTruthy();
        });

        it('should return null if input is falsey', function () {
            var search = null,
                result = filter(null, search);

            expect(result).toBeNull();
        });

        it('should return original students array if search is falsey', function () {
            var search = null,
                result = filter(students, search);

            expect(result).toBe(students);
        });

        it('should partial match on first name', function () {
            var search = 'Cha',
                result = filter(students, search);

            expect(result).toEqual([student1]);
        });

        it('should partial match on last name', function () {
            var search = 'Gar',
                result = filter(students, search);

            expect(result).toEqual([student1]);
        });

        it('should partial match on student id', function () {
            var search = '112',
                result = filter(students, search);

            expect(result).toEqual([student1]);
        });

        it('should match on first name', function () {
            var search = 'Charlotte',
                result = filter(students, search);

            expect(result).toEqual([student1]);
        });

        it('should match on last name', function () {
            var search = 'Garcia',
                result = filter(students, search);

            expect(result).toEqual([student1]);
        });

        it('should match on student id', function () {
            var search = '11295',
                result = filter(students, search);

            expect(result).toEqual([student1]);
        });

        it('should match on full name', function () {
            var search = 'Charlotte Garcia',
                result = filter(students, search);

            expect(result).toEqual([student1]);
        });

        it('should trim spaces', function () {
            var search = '   Charlotte Garcia   ',
                result = filter(students, search);

            expect(result).toEqual([student1]);
        });

        it('should ignore case', function () {
            var search = 'CHARLOTTE GARCIA',
                result = filter(students, search);

            expect(result).toEqual([student1]);
        });

    });

});