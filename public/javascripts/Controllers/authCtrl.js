/**
 * Created by hamidhoseini on 10/16/15.
 */
/**
 * Created by andrea.terzani on 09/04/2015.
 */

mainControllers.controller('authController', function($scope,$http,$location) {

    $scope.user  = {username:'',password:''};
    $scope.alert = '';

    $scope.login = function(user){
        console.log('First...!');

        $http.post('/auth/login', user).
            success(function(data) {
                $scope.loggeduser = data;
                console.log('you signed in...!');
                $location.path('/curriculum');
            }).
            error(function(err) {
                $scope.alert = 'Login failed: ' + err;
            });

    };

    $scope.signup = function(user){
        console.log('you are signup');
        console.log(user);
        if (user.username ==='' || user.username === null) {
            $scope.alert = 'user is empty';
            return;
        }
        $http.post('/auth/signup', user).
            success(function(data) {
                $scope.alert = data.alert;
            }).
            error(function() {
                $scope.alert = 'Registration failed'
            });

    };

    $scope.userinfo = function() {
        $http.get('/auth/currentuser').
            success(function (data) {
                $scope.loggeduser = data;
            }).
            error(function () {
                $scope.alert = 'Login failed'
            });
    };



    $scope.logout = function(){
        $http.get('/auth/logout')
            .success(function() {
                $scope.loggeduser = {};
                $location.path('/signin');

            })
            .error(function() {
                $scope.alert = 'Logout failed'
            });
    };
});
