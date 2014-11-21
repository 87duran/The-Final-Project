var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());

var Sequelize = require('sequelize')
    , sequelize = new Sequelize('test', 'cduran87', 'postgres', {
        dialect: "postgres", // or 'sqlite', 'postgres', 'mariadb'
        port:    5432
    });

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
    console: Sequelize.STRING
}, {
    tableName: 'gamemobtest_users', // this will define the table's name
    timestamps: true           // this will deactivate the timestamp columns
});

var Session = sequelize.define('test_sessions', {
    game: Sequelize.STRING,
    date: Sequelize.STRING,
    skill_level: Sequelize.STRING,
    time: Sequelize.STRING,
}, {
    tableName: 'test_sessions', // this will define the table's name
    timestamps: true           // this will deactivate the timestamp columns
});

sequelize
    .sync({ force: true })
    .complete(function(err) {
        if (!!err) {
            console.log('An error occurred while creating the table:', err)
        } else {
            console.log('It worked!')
        }
    });



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
        console: gameMobtest_user.console
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
        game: test_session.game,
        date: test_session.date,
        skill_level: test_session.skill_level,
        time: test_session.time
    })
        .complete(function(err, user) {
            console.log(err);
            sequelize.query("SELECT * FROM test_sessions").success(function(myTableRows) {
                res.json(myTableRows);
            });
        });
});


app.listen(3000);