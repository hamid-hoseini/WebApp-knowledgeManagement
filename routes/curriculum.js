/**
 * Created by hamidhoseini on 8/30/15.
 */
var express = require('express');
//var app = require('../app');
//var myrouter = require('../app/routes')(app);
//console.log(myrouter);
var router = express.Router();

var Sequelize = require('sequelize')
    , sequelize = new Sequelize('questionsbank', 'root', 'mary2016', {
        dialect: "mysql", // or 'sqlite', 'postgres', 'mariadb'
        port:    3306// or 5432 (for postgres)
    });

sequelize
    .authenticate()
    .then(function(err) {
        console.log('Connection has been established successfully.');
    }, function (err) {
        console.log('Unable to connect to the database:', err);
    });
/* GET home page. */
router.get('/curriculum', function(req, res, next) {
    //res.render('curriculum', { title: 'hamid hoseini'});
    sequelize.query("SELECT * FROM curriculum_view", { type: sequelize.QueryTypes.SELECT})
        .then(function(result) {
            // We don't need spread here, since only the results will be returned for select queries
            //res.render('curriculum', { title:'curriculum', data: result[0]});
            res.send(result);
        }, function (err) {
            res.send(err);
        });
});
router.get('/subject_get', function(req, res, next) {
    sequelize.query("SELECT * FROM subject", { type: sequelize.QueryTypes.SELECT})
        .then(function(result) {
            // We don't need spread here, since only the results will be returned for select queries
            console.log(result);
            res.render('curriculum', { title:'subjects', data: JSON.stringify(result[0].description)});
        });
});
router.post('/subject_post', function(req, res, next) {
    console.log(req.body);
    sequelize.query("insert into subject (description) values ('"+req.body.description+"')", { type: sequelize.QueryTypes.INSERT})
        .then(function(result) {
            // We don't need spread here, since only the results will be returned for select queries
            console.log(result);
        });
});
router.put('/subject_put/:id', function(req, res, next) {
    console.log(req.body);
    sequelize.query("update subject set description= '"+req.body.description+"' where id="+req.params.id+"", { type: sequelize.QueryTypes.INSERT})
        .then(function(result) {
            // We don't need spread here, since only the results will be returned for select queries
            console.log(result);
        });
});

router.get('/topic_get', function(req, res, next) {
    sequelize.query("SELECT * FROM topic", { type: sequelize.QueryTypes.SELECT})
        .then(function(result) {
            // We don't need spread here, since only the results will be returned for select queries
            console.log(result);
            res.render('curriculum', { title:'topic', data: JSON.stringify(result[0].description)});
        });
});
router.post('/topic_post', function(req, res, next) {
    console.log(req.body);
    sequelize.query("insert into topic (description, subject_id) values ('"+req.body.description+"',"+req.body.subject_id+")", { type: sequelize.QueryTypes.INSERT})
        .then(function(result) {
            // We don't need spread here, since only the results will be returned for select queries
            console.log(result);
        });
});
router.put('/topic_put/:id', function(req, res, next) {
    console.log(req.body);
    var subject_id = req.body.subject_id ? ", subject_id="+req.body.subject_id: "";
    sequelize.query("update topic set description= '"+req.body.description+"'" + subject_id+ " where id="+req.params.id+"", { type: sequelize.QueryTypes.UPDATE})
        .then(function(result) {
            // We don't need spread here, since only the results will be returned for select queries
            console.log(result);
        });
});

router.get('/subTopic_get', function(req, res, next) {
    sequelize.query("SELECT * FROM subTopic", { type: sequelize.QueryTypes.SELECT})
        .then(function(result) {
            // We don't need spread here, since only the results will be returned for select queries
            console.log(result);
            res.render('subTopic', { title:'subTopic', data: JSON.stringify(result[0].description)});
        });
});
router.post('/subTopic_post', function(req, res, next) {
    sequelize.query("insert into subTopic (description, subject_id) values ('"+req.body.description+"',"+req.body.subject_id+")", { type: sequelize.QueryTypes.INSERT})
        .then(function(result) {
            // We don't need spread here, since only the results will be returned for select queries
            console.log(result);
        });
});
router.put('/subTopic_put/:id', function(req, res, next) {
    var fields = null;
    var description = req.body.description ? " description='"+ req.body.description+"'" : "";
    var topic_id = req.body.topic_id ? ", topic_id="+req.body.topic_id: "";
    var dependentTopic_id = req.body.dependentTopic_id ? ", dependentTopic_id="+req.body.dependentTopic_id: "";

    fields = description + topic_id + dependentTopic_id;
    if (fields) {
        if (fields.substr(0, 1) == ",") {
            fields = fields.substr(1, fields.length);
        }
    } else {
        return;
    }

    sequelize.query("update subTopic set  "+fields+ " where id="+req.params.id+"", { type: sequelize.QueryTypes.UPDATE})
        .then(function(result) {
            // We don't need spread here, since only the results will be returned for select queries
            console.log(result);
        });
});
router.get('/questions', function(req, res, next) {
    sequelize.query("SELECT * FROM questions_view", { type: sequelize.QueryTypes.SELECT})
        .then(function(result) {
            // We don't need spread here, since only the results will be returned for select queries
            //res.render('curriculum', { title:'curriculum', data: result[0]});

            //res.send(result);
            //if (err) res.status(500).json({error: err});
            res.status(200).json({result: result});

        });
});
router.get('/refmaterial/:id', function(req, res, next) {
    sequelize.query("SELECT * FROM refmaterial where topic_id="+ req.params.id, { type: sequelize.QueryTypes.SELECT})
        .then(function(result) {
            res.status(200).json({result: result});

        });
});
router.post('/refmaterial', function(req, res, next) {
    sequelize.query("insert into refmaterial (description, topic_id, url) values ('"+req.body.description+"',"+req.body.topic_id+",'"+req.body.url+"')", { type: sequelize.QueryTypes.INSERT})
        .then(function(result) {
            console.log(result);
            res.status(200).json({result: result});
        });
});
router.get('/gitrepo/:id', function(req, res, next) {
    sequelize.query("SELECT * FROM gitrepo where topic_id="+ req.params.id, { type: sequelize.QueryTypes.SELECT})
        .then(function(result) {
            res.status(200).json({result: result});

        });
});
router.post('/gitrepo', function(req, res, next) {
    sequelize.query("insert into gitrepo (description, topic_id, url) values ('"+req.body.description+"',"+req.body.topic_id+",'"+req.body.url+"')", { type: sequelize.QueryTypes.INSERT})
        .then(function(result) {
            console.log(result);
            res.status(200).json({result: result});
        });
});
router.get('/slides/:id', function(req, res, next) {
    sequelize.query("SELECT * FROM slides where subject_id="+ req.params.id, { type: sequelize.QueryTypes.SELECT})
        .then(function(result) {
            res.status(200).json({result: result});

        });
});
router.post('/slides', function(req, res, next) {
    sequelize.query("insert into slides (description, subject_id, url) values ('"+req.body.description+"',"+req.body.subject_id+",'"+req.body.url+"')", { type: sequelize.QueryTypes.INSERT})
        .then(function(result) {
            console.log(result);
            res.status(200).json({result: result});
        });
});
router.get('/projects/:id', function(req, res, next) {
    sequelize.query("SELECT * FROM projects where subject_id="+ req.params.id, { type: sequelize.QueryTypes.SELECT})
        .then(function(result) {
            res.status(200).json({result: result});

        });
});
module.exports = router;
