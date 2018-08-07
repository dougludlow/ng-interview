(function () {
    'use strict';

    angular
        .module('ngInterview.students')
        .filter('students', studentsFilter);

    studentsFilter.$inject = [];
    function studentsFilter() {
        return function (students, search) {
            if (!students) {
                return null;
            }
            if (!search) {
                return students;
            }
            return students.filter(function (student) {
                var phrase = student.FirstName + ' ' + student.LastName + ' ' + student.Id;
                return phrase.toLowerCase().indexOf(search.trim().toLowerCase()) >= 0;
            });
        }
    }
})();