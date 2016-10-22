/**
 * Created by hamidhoseini on 9/18/15.
 */
mainControllers.controller('ModalInstanceCtrl', function ($rootScope,$scope, $modalInstance, items,APPCONSTANT, curriculumSrv) {

    var postData = {};
    $scope.items = items;
    $scope.input = false;
    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.addItem = function () {
        $scope.input = true;
        reset();
    };
    $scope.triger = function(){
        console.log('hamid');
        $rootScope.$broadcast('SOME_TAG', 'your value');
    };

    $scope.saveRecord = function () {
        $scope.input = false;
        switch ($scope.items.tableName){
            case APPCONSTANT.tableName.gitrepo :
                postInitialize("topic_id");

                curriculumSrv.gitRepoPost(postData).then(function (result) {
                    addToList("topic_id");
                },  function (error) {
                    console.log('there are some errors...!');
                });
                break;

            case APPCONSTANT.tableName.refmaterial :
                postInitialize("topic_id");

                curriculumSrv.refMaterialPost(postData).then(function (result) {
                    addToList("topic_id");
                },  function (error) {
                    console.log('there are some errors...!');
                });
                break;
            case APPCONSTANT.tableName.slides :
                postInitialize("subject_id");
                curriculumSrv.slidesPost(postData).then(function (result) {
                    addToList("subject_id");
                },  function (error) {
                    console.log('there are some errors...!');
                });                break;
        }
    };

    $scope.saveNewItem = function () {
        if ($scope.desc) {
            $scope.items.data.push($scope.desc);
            $scope.desc = '';
        }
    };
    function reset(){
        postData = {};
        $scope.desc = '';
        $scope.url = '';
    }
    function postInitialize(typeId){
        postData.description = $scope.desc;
        postData.url = $scope.url;
        postData[typeId] = $scope.items.item_id;
    }
    function addToList(typeId){
        var obj = {};
        obj.description = $scope.desc;
        obj.url = $scope.url;
        obj[typeId] = $scope.items.item_id;
        $scope.items.data.result.push(obj);
    }
    $scope.cancel = function () {
        $scope.input = false;
        reset();
    };

    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
    };

    $scope.close = function () {
        $modalInstance.dismiss('cancel');
    };
});