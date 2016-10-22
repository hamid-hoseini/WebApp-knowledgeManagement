/**
 * Created by hamidhoseini on 9/9/15.
 */
mainControllers.controller('questionsCtrl', function ($scope,curriculumSrv) {

    $scope.getQuestions = function () {
        curriculumSrv.questions().then(function (data) {
            $scope.questions = data.data.result;
            //console.log(data.data.result);
            return data.data.result;
        });
    };
    $scope.getQuestions();

    $scope.gridOptions = {
        data: 'questions',
        enableRowSelection : true,
        multiSelect: false,
        enableRowHeaderSelection: false,
        columnDefs: [
            {field: 'id', name: 'Id' ,width: '5%'},
            {field: 'description', name: 'Description',width: '60%'},
            {field: 'categories', name: 'Categories',width: '15`%'},
            {field: 'mode', name: 'Mode',width: '5%'},
            {field: 'type', name: 'Type',width: '5%'},
            {field: 'name', name: 'Company',width: '10%'},


            /*{field: '', name: ' ',cellTemplate: '<button ng-click="edit(row)" class="btn btn-small">' +
             '<i class="fa fa-pencil-square-o"></i> Edit</button>',width: '20%'}*/]
    };
});