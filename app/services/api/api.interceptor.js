(function () {
    'use strict';

    angular
        .module('ngInterview.api')
        .factory('apiInterceptor', apiInterceptor);

    apiInterceptor.$inject = ['$injector', '$q', 'API_BASE', 'urljoin'];

    function apiInterceptor($injector, $q, API_BASE, urljoin) {
        return {
            request: request,
            responseError: responseError
        };

        function request(config) {
            // Ignore templates
            if (config.url.lastIndexOf('.html') >= 0){
                return config;
            }
            if (!isAbsolute(config.url)) {
                config.url = urljoin(API_BASE, config.url);
            }
            return config;
        }

        function responseError(response) {
            if (response.status === 503) {
                var $http = $injector.get('$http');
                return $http(response.config);
            }
            return $q.reject(response);
        }
    }

    function isAbsolute(url) {
        return url.indexOf('http://') === 0 || url.indexOf('https://') === 0;
    }

})();