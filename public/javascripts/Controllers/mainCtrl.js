/**
 * Created by hamidhoseini on 9/7/15.
 */
var mainControllers = angular.module('mainControllers',[]);
mainControllers.controller('curriculumCtrl', function ($scope,curriculumSrv,$modal,APPCONSTANT,$location) {
    $scope.breadCrumb = [];
    var breadObj = {};
    breadObj.text = "Curriculum";
    breadObj.type = "Root";
    breadObj.id = 0;
    $scope.breadCrumb.push(breadObj);
    $scope.selected = null;

    curriculumSrv.curriculum().then(function (result) {
        $scope.data = curriculumSrv.tableToJson(result.data);

        /** make curriculum tree **/
        var curriculumObj = $scope.data.curriculum;
        var ul = $('<ul></ul>');
        for (prop in curriculumObj){
            var li = $('<li></li>');

            var liSpan = $('<span></span>');
            liSpan.text(curriculumObj[prop].item_desc);
            liSpan.data('id',curriculumObj[prop].item_id);
            liSpan.data('type','subject');
            liSpan.on('click', function () {
                var subList = returnDetails(curriculumObj, $(this).data('id'), "item_id");
                $scope.curr = subList[0].details ;

                //$('<i class="fa fa-plus-square-o"></i>').appendTo('#addbtn');
                //$('#addbtn').text('New Topic');
                $('#addbtn').html('<i class="fa fa-plus-square-o"></i> New Topic');
                breadCrumbMng($(this));
                $scope.selected = 'topic';
                $scope.$apply();


            }).appendTo(li).addClass('cursor');

            // topic details
            if (curriculumObj[prop].details.length!=0){
                var span = $('<span></span>');
                span.text(' [+]');
                span.addClass('cursor');
                span.attr('data-id',curriculumObj[prop].item_id);
                span.attr('data-show','false');


                /** add click event if current record has child  **/
                span.click(function () {
                    if ($(this).attr('data-show') ==='true'){
                        $(this).parent().find('ul').remove();
                        $(this).attr('data-show', 'false');
                        var text = $(this).text();
                        $(this).text(text.replace(' [-]', ' [+]'));
                    } else {
                        var newUl = $('<ul></ul>'),
                            idx = $(this).attr('data-id');
                        var subList = returnDetails(curriculumObj, idx, "item_id");

                        for (var i = 0; i < subList[0].details.length; i++) {
                            var subli = $('<li></li>');
                            var subLiSpan = $('<span></span>');
                            subLiSpan.text(subList[0].details[i].item_desc);

                            subLiSpan.data('id',subList[0].details[i].item_id);
                            subLiSpan.data('type','topic');

                            subLiSpan.on('click', function (event) {
                                var subNewList = returnDetails(subList[0].details, $(this).data('id'), "item_id");
                                $scope.curr = subNewList[0].details ;

                                //$('<i class="fa fa-plus-square-o"></i>').appendTo('#addbtn');
                                //$('#addbtn').text('New Sub Topic');
                                $('#addbtn').html('<i class="fa fa-plus-square-o"></i> New Sub Topic');
                                breadCrumbMng($(this));
                                $scope.selected = 'subtopic';
                                $scope.$apply();
                            }).appendTo(subli).addClass('cursor');

                            /** start: check for sub topic **/
                            if (subList[0].details[i].details.length!=0) {
                                var subSpan = $('<span></span>');
                                subSpan.text(' [+]');
                                subSpan.addClass('cursor');
                                subSpan.attr('data-topicId', subList[0].details[i].item_id);
                                subSpan.attr('data-show', 'false');
                                subSpan.click(function () {
                                    if ($(this).attr('data-show')==='true'){
                                        $(this).parent().find('ul').remove();
                                        $(this).attr('data-show', 'false');
                                        var text = $(this).text();
                                        $(this).text(text.replace(' [-]', ' [+]'));
                                    } else {
                                        var subUl = $('<ul></ul>'),
                                            idx = $(this).attr('data-topicId');
                                        var topicList = returnDetails(subList[0].details, idx, "item_id");

                                        for (var i = 0; i < topicList[0].details.length; i++) {
                                            var subli = $('<li></li>');
                                            subli.text(topicList[0].details[i].item_desc);
                                            subUl.append(subli);
                                            $(this).parent().append(subUl);
                                            var text = $(this).text();
                                            $(this).text(text.replace(' [+]', ' [-]'));
                                            $(this).attr('data-show', 'true');
                                        }
                                    }

                                });

                                subli.append(subSpan);
                            }
                            /** end: check for sub topic **/

                            newUl.append(subli);
                            $(this).parent().append(newUl);
                            var text = $(this).text();
                            $(this).text(text.replace(' [+]', ' [-]'));
                            $(this).attr('data-show', 'true');
                        }
                    }
                });
                /** end of event handler for span **/
                li.append(span);
            }
            ul.append(li);
        }
        var rootUl= $('<ul></ul>');
        var rootChild = $('<li></li>').text('Curriculum').addClass('cursor');
        rootChild.data('id',0);
        rootChild.data('type','Root');
        rootChild.on('click', function () {

            //$('<i class="fa fa-plus-square-o"></i>').appendTo('#addbtn');
            //$('#addbtn').text(' New Subject');
            $('#addbtn').html('<i class="fa fa-plus-square-o"></i> New Subject');
            $(this).text = "Curriculum";
            $(this).type = "Root";
            $(this).id = 0;
            breadCrumbMng($(this));
            $scope.selected = 'subject';
            $scope.getData();
            $scope.$apply();
        });
        rootUl.append(rootChild);
        rootUl.append(rootChild).append(ul);

        $('#curriculum').append(rootUl);
        /** make curriculum tree **/

    }, function (err) {
        //$location.path('/signin');
    });
    $scope.getRefMaterial = function () {
        var refMaterialObj = {};
        $scope.getSelectedRows();
        if ($scope.mySelectedRows.length !== 0) {
            var topic_id = $scope.mySelectedRows[0].item_id;
            curriculumSrv.refMaterial(topic_id).then(function (result) {
                refMaterialObj.item_id = topic_id;
                refMaterialObj.item_desc = $scope.mySelectedRows[0].item_desc;
                refMaterialObj.data = result.data;
                refMaterialObj.tableName = APPCONSTANT.tableName.refmaterial;

            });
            $scope.open(null, refMaterialObj);
        }
    };
    $scope.getGitRepo = function () {
        var gitRepoObj = {};
        $scope.getSelectedRows();
        if ($scope.mySelectedRows.length !== 0) {
            var topic_id = $scope.mySelectedRows[0].item_id;
            curriculumSrv.gitRepo(topic_id).then(function (result) {
                gitRepoObj.item_id = topic_id;
                gitRepoObj.item_desc = $scope.mySelectedRows[0].item_desc;
                gitRepoObj.data = result.data;
                gitRepoObj.tableName = APPCONSTANT.tableName.gitrepo;

            });
            $scope.open(null, gitRepoObj);
        }
    };

    $scope.getSlides = function () {
        var slidesObj = {};
        $scope.getSelectedRows();
        if ($scope.mySelectedRows.length !== 0) {
            var subject_id = $scope.mySelectedRows[0].item_id;
            curriculumSrv.slides(subject_id).then(function (result) {
                slidesObj.item_id = subject_id;
                slidesObj.item_desc = $scope.mySelectedRows[0].item_desc;
                slidesObj.data = result.data;
                slidesObj.tableName = APPCONSTANT.tableName.slides;
            });
            $scope.open(null, slidesObj);
        }
    };

    $scope.getProjects = function () {
        var projectsObj = {};
        $scope.getSelectedRows();
        if ($scope.mySelectedRows.length !== 0) {
            var subject_id = $scope.mySelectedRows[0].item_id;
            curriculumSrv.projects(subject_id).then(function (result) {
                projectsObj.item_id = subject_id;
                projectsObj.item_desc = $scope.mySelectedRows[0].item_desc;
                projectsObj.data = result.data;
                projectsObj.tableName = APPCONSTANT.tableName.projects;
            });
            $scope.open(null, projectsObj);
        }
    };
    $scope.addNewItem = function () {
        var addEditObj = {};

        addEditObj.item_desc = 'Add new subject to: Curriculum';
        addEditObj.data = [];

        $scope.open(null, addEditObj, "addEditContent.html");
    };

    $scope.getData = function () {
        $scope.curr = $scope.data.curriculum;
    };
    $scope.$on('SOME_TAG', function(response) {
        console.log('test mikonom ay test mikonom');
    });

    function breadCrumbMng(item){
        $scope.breadCrumb = [];
        var breadObj = {};

        breadObj.text = "Curriculum";
        breadObj.type = "Root";
        breadObj.id = 0;

        $scope.breadCrumb.push(breadObj);
        var elements = $(item).parents().filter('li');
        for(var i=elements.length-1 ; i>= 0; i--){
            breadObj = {};
            breadObj.text = $(elements[i]).find('span').text().split('[')[0];
            breadObj.type = $(elements[i]).find('span').data('type');
            breadObj.id = $(elements[i]).find('span').data('id');

            $scope.breadCrumb.push(breadObj);
        }

    }
    function returnDetails(obj, idx, prop){
        var list = $.grep(obj, function (el) {
            return el[prop] == idx;
        });
        return list;
    }

    /**  start of modal **/
    $scope.myData = ['item1', 'item2', 'item3'];
    $scope.animationsEnabled = true;

    $scope.open = function (size, dataObj, htmlName) {

        if (htmlName == null)
            htmlName = 'myModalContent.html';
        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: htmlName,
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                items: function () {
                    //return $scope.myData;
                    return dataObj;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };
    /**  end of modal **/

    /** start of Grid **/

    $scope.getSelectedRows = function() {
        $scope.mySelectedRows = $scope.gridApi.selection.getSelectedRows();
    };
    $scope.gridOptions = {
        data: 'curr',
        enableRowSelection : true,
        multiSelect: false,
        enableRowHeaderSelection: false,
        columnDefs: [
            {field: 'item_id', name: 'Id' ,width: '10%'},
            {field: 'item_desc', name: 'Name',width: '90%'}
            /*{field: '', name: ' ',cellTemplate: '<button ng-click="edit(row)" class="btn btn-small">' +
            '<i class="fa fa-pencil-square-o"></i> Edit</button>',width: '20%'}*/]
    };
    $scope.gridOptions.onRegisterApi = function(gridApi){
        //set gridApi on scope
        $scope.gridApi = gridApi;
    };
    /** end of  Grid **/
});