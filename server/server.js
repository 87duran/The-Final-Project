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

var User = sequelize.define('gamemob_users', {
//    id: Sequelize.INTEGER,
    sign_up_date: Sequelize.DATE,
    user_id: Sequelize.STRING,
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    console: Sequelize.STRING
}, {
    tableName: 'gamemob_users', // this will define the table's name
    timestamps: false           // this will deactivate the timestamp columns
});

app.get('/', function(req, res){
    res.send('this is my home')
});

app.get('/users', function(req, res) {
    sequelize.query("SELECT * FROM gameMob_users").success(function(myTableRows) {
        res.json(myTableRows);
    })
});

app.post('/users', function(req,res) {
    var gameMob_user = req.body.gameMob_user;
    console.log(gameMob_user);
    User.create({
        user_id: gameMob_user.user_id,
        first_name: gameMob_user.first_name,
        last_name: gameMob_user.last_name,
        console: gameMob_user.console
    })
        .complete(function(err, user) {
            console.log(err);
            sequelize.query("SELECT * FROM gameMob_users").success(function(myTableRows) {
                res.json(myTableRows);
            });
        });
});




app.listen(3000);