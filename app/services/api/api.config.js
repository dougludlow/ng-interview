(function () {
    'use strict';

    angular
        .module('ngInterview.api')
        .constant('urljoin', window.urljoin)
        .constant('API_BASE', 'http://il-resume-api.azurewebsites.net')
        .config(config);

    config.$inject = ['$httpProvider'];
    function config($httpProvider) {
        $httpProvider.interceptors.push('apiInterceptor');
    }

})();