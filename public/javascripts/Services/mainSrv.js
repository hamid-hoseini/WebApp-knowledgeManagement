/**
 * Created by hamidhoseini on 9/7/15.
 */
mainControllers.factory('curriculumSrv', function ($http, $q) {

    return {
        tableToJson : function (inpData) {
            var jsonData = {
                "ver": 1.0,
                "company": "Go-Livelabs",
                "curriculum": []
            };
            var subject_id = null,
                topic_id = null,
                subTopic_id = null;

            for(var prop in inpData) {
                if (subject_id !== inpData[prop].subject_id) {
                    var obj = {};
                    subject_id = inpData[prop].subject_id;
                    obj.item_id = subject_id;
                    obj.item_desc = inpData[prop].subject_desc;
                    obj.details = [];
                    var subjectList = $.grep(inpData, function (sub) {
                        return sub.subject_id === subject_id;
                    });
                    for (prop1 in subjectList) {
                        if (subjectList[prop1].topic_id && topic_id !== subjectList[prop1].topic_id) {
                            var topObj = {};
                            topic_id = subjectList[prop1].topic_id;
                            topObj.item_id = topic_id;
                            topObj.item_desc = subjectList[prop1].topic_desc;
                            topObj.details = [];

                            var topicList = $.grep(subjectList, function (top) {
                                return top.topic_id === topic_id;
                            });
                            for (prop2 in topicList){
                                if (topicList[prop2].subTopic_id && subTopic_id !== topicList[prop2].subTopic_id){
                                    var subTopObj ={};
                                    subTopic_id = topicList[prop2].subTopic_id;
                                    subTopObj.item_id = subTopic_id;
                                    subTopObj.item_desc = topicList[prop2].subTopic_desc;
                                    topObj.details.push (subTopObj);
                                }
                            }
                            obj.details.push(topObj);
                        }
                    }
                    jsonData.curriculum.push(obj);
                }
            }
            //console.log(JSON.stringify(jsonData));
            return jsonData;
        },
        curriculum: function () {
            return $http.get('curriculum/curriculum').success(function (data) {
                /*                var jsonData= tableToJson(data);
                 console.log(jsonData);*/
                return data;
            }).error(function (err) {
                console.log(err);
            })
        },
        refMaterial: function (topic_id) {
            return $http.get('curriculum/refmaterial/'+topic_id).success(function (data) {
                /*                var jsonData= tableToJson(data);
                 console.log(jsonData);*/
                return data;
            })
        },
        refMaterialPost: function (postData) {
            return $http.post('curriculum/refmaterial',postData).then(function (response) {
                 return response;
             }).catch(function (err) {
                 return err;
             }).finally(function () {
                console.log('it happens finally...');
            });
        },
        gitRepo: function (topic_id) {
            return $http.get('curriculum/gitrepo/'+topic_id).success(function (data) {
                return data;
            })
        },
        gitRepoPost: function (postData) {
            return $q(function (resolve, reject) {
                 $http.post('curriculum/gitrepo',postData).success(function (response) {
                 resolve(response);
             }).error(function (err) {
                 reject(err);
                 });
             });
        },
        questions: function () {
            return $http.get('curriculum/questions').success(function (data) {
                return data;
            })
        },
        slides: function (subject_id) {
            return $http.get('curriculum/slides/'+subject_id).success(function (data) {
                return data;
            })
        },
        slidesPost: function (postData) {
            return $q(function (resolve, reject) {
                $http.post('curriculum/slides',postData).success(function (response) {
                    resolve(response);
                }).error(function (err) {
                    reject(err);
                });
            });
        },
        projects: function (subject_id) {
            return $http.get('curriculum/projects/'+subject_id).success(function (data) {
                return data;
            })
        }
    }
});