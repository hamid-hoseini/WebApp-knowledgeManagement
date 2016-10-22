/**
 * Created by hamidhoseini on 9/7/15.
 */
var boqApp = angular.module('boqAPP', ['ngRoute','ui.grid','mainControllers', 'ui.grid.selection','ui.bootstrap']);
boqApp.config(['$routeProvider', function ($routeProvider){
    $routeProvider.when('/curriculum', {
        templateUrl: '/curriculum.ejs',
        controller: 'curriculumCtrl'
    }).when('/questions', {
        templateUrl:'questions.ejs',
        controller: 'questionsCtrl'
    }).when('/signin', {
        templateUrl: 'login.ejs',
        controller: 'authController'
    }).when('/signup', {
        templateUrl: 'signup.ejs',
        controller: 'authController'
    }).when('/user', {
        templateUrl: 'userinfo.ejs',
        controller: 'authController'
    }).otherwise({
        redirectTo: '/signin'
    });
}]);