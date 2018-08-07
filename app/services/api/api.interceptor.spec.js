'use strict';

describe('ngInterview.api', function () {

    var $httpProvider,
        API_BASE = 'http://bar.com/baz';

    beforeEach(module('ngInterview.api', function (_$httpProvider_, $provide) {
        $httpProvider = _$httpProvider_;
        $provide.constant('API_BASE', API_BASE);
    }));

    describe('apiInterceptor', function () {

        var apiInterceptor;

        beforeEach(inject(function (_apiInterceptor_) {
            apiInterceptor = _apiInterceptor_;
        }));

        it('should be registered', function () {
            expect($httpProvider.interceptors).toContain('apiInterceptor');
        });

        it('should be instantiated', function () {
            expect(apiInterceptor).toBeDefined();
        });

        describe('request', function () {

            it('should return the url unchanged if the url is absolute', function () {
                var result = apiInterceptor.request({
                    url: 'http://foo.com/bar'
                });

                expect(result.url).toBe('http://foo.com/bar');
            });

            it('should return the url prefixed with the API_BASE if the url is relative (starts with slash)', function () {
                var result = apiInterceptor.request({
                    url: '/foo'
                });

                expect(result.url).toBe('http://bar.com/baz/foo');
            });

            it('should return the url prefixed with the API_BASE if the url is relative (doesn\'t start with slash)', function () {
                var result = apiInterceptor.request({
                    url: 'foo'
                });

                expect(result.url).toBe('http://bar.com/baz/foo');
            });

        });

        describe('responseError', function () {

            var $httpBackend, $rootScope;

            beforeEach(inject(function (_$httpBackend_, _$rootScope_) {
                $httpBackend = _$httpBackend_;
                $rootScope = _$rootScope_;
            }));

            afterEach(function () {
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });

            it('should retry when status is 503', function () {
                var success = jasmine.createSpy('success');
                var error = jasmine.createSpy('error');

                $httpBackend.expectGET('http://foo.com/bar').respond('200', '')
                apiInterceptor.responseError({
                    status: 503,
                    config: {
                        method: 'GET',
                        url: 'http://foo.com/bar'
                    }
                }).then(success, error);
                $httpBackend.flush();
                $rootScope.$apply();

                expect(success).toHaveBeenCalled();
                expect(error).not.toHaveBeenCalled();
            });

            it('should not retry when status is 500', function () {
                var success = jasmine.createSpy('success');
                var error = jasmine.createSpy('error');

                apiInterceptor.responseError({
                    status: 500,
                    config: {
                        method: 'GET',
                        url: 'http://foo.com/bar'
                    }
                }).then(success, error);
                $rootScope.$apply();

                expect(success).not.toHaveBeenCalled();
                expect(error).toHaveBeenCalled();
            });

        });

    });

});