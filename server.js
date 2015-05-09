var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
var fs = require('fs');

var hskey = fs.readFileSync('server.key');
var hscert = fs.readFileSync('server.crt');

var options = {
    key: hskey,
    cert: hscert
};
var app = require('express').createServer(options);


app.get('/', function(req, res) {
    res.sendFile('/index.html',  { root: __dirname })
});

app.set('port', (process.env.PORT || 5000));

var pg = require('pg');

var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://groqrvjslptfvy:n1DqeU3ip_nEiHRUL6NxWRSoxk@ec2-50-19-219-80.compute-1.amazonaws.com:5432/d88t3mqmdb28f1');

//var Sequelize = require('sequelize')
//    , sequelize = new Sequelize('test', 'cduran87', 'postgres', {
//        dialect: "postgres", // or 'sqlite', 'postgres', 'mariadb'
//        port:    5432
//    });

//pg.connect(process.env.DATABASE_URL, function(err, client) {
//    var query = client.query('SELECT * FROM gamemobtest_users');
//
//    query.on('row', function(row) {
//        console.log(JSON.stringify(row));
//    });
//});

app.get('/db', function (request, response) {
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        client.query('SELECT * FROM test_sessions', function(err, result) {
            done();
            if (err)
            { console.error(err); response.send("Error " + err); }
            else
            { response.send(result.rows); }
        });
    });
})



sequelize
    .authenticate()
    .complete(function(err) {
        if (err) {
            console.log('Unable to connect to the database:', err)
        } else {
            console.log('Connection has been established successfully.')
        }
    });

var User = sequelize.define('gameMobtest_users', {
    //id: Sequelize.INTEGER,
    sign_up_date: Sequelize.STRING,
    user_id: Sequelize.STRING,
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    console: Sequelize.STRING,
    skill_level: Sequelize.STRING
}, {
    tableName: 'gamemobtest_users', // this will define the table's name
    timestamps: true           // this will deactivate the timestamp columns
});

var Session = sequelize.define('test_sessions', {
    createdBy: Sequelize.STRING,
    game: Sequelize.STRING,
    date: Sequelize.STRING,
    skill_level: Sequelize.STRING,
    time: Sequelize.STRING,
    description: Sequelize.STRING
}, {
    tableName: 'test_sessions', // this will define the table's name
    timestamps: true           // this will deactivate the timestamp columns
});

sequelize
    .sync({ force: false })
    .complete(function(err) {
        if (err) {
            console.log('An error occurred while creating the table:', err)
        } else {
            console.log('It worked!')
        }
    });

//thanks


app.get('/users', function(req, res) {
    sequelize.query("SELECT * FROM gamemobtest_users").success(function(myTableRows) {
        res.json(myTableRows);
    })
});

app.post('/users', function(req,res) {
    var gameMobtest_user = req.body.gameMobtest_user;
    console.log(gameMobtest_user);
    User.create({
        user_id: gameMobtest_user.user_id,
        first_name: gameMobtest_user.first_name,
        last_name: gameMobtest_user.last_name,
        console: gameMobtest_user.console,
        skill_level: gameMobtest_user.skill_level
    })
        .complete(function(err, user) {
            console.log(err);
            sequelize.query("SELECT * FROM gameMobtest_users").success(function(myTableRows) {
                res.json(myTableRows);
            });
        });
});

app.get('/sessions', function(req, res) {
    sequelize.query("SELECT * FROM test_sessions").success(function(myTableRows) {
        res.json(myTableRows);
    })
});

app.post('/sessions', function(req,res) {
    var test_session = req.body.test_session;
    console.log(test_session);
    Session.create({
        createdBy: test_session.createdBy,
        game: test_session.game,
        date: test_session.date,
        skill_level: test_session.skill_level,
        time: test_session.time,
        description: test_session.description
    })
        .complete(function(err, user) {
            console.log(err);
            sequelize.query("SELECT * FROM test_sessions").success(function(myTableRows) {
                res.json(myTableRows);
            });
        });
});

app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'));
});



//app.listen(3000);