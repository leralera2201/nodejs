const express = require('express');
const exprsHbs = require('express-handlebars');
const hbs = require('hbs');
const path = require('path');
const users = require('./db');
const app = express();

let isLogin = true;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(process.cwd(), 'views')));
app.set('view engine', '.hbs');
app.engine("hbs", exprsHbs(
    {
        layoutsDir: "views/layout",
        defaultLayout: "layout",
        extname: "hbs"
    }
));
app.set('views', path.join(process.cwd(), 'views'));
hbs.registerPartials(__dirname + "/views/partials");

app.get('/', (req, res) => {
    if(!isLogin){
        return res.redirect('/login');
    }

    res.render('home', {users, isLogin});
});

app.get('/login', (req, res) => {
    if(isLogin){
        return res.redirect('/');
    }

    res.render('login');
});

app.get('/register', (req, res) => {
    if(isLogin){
        return res.redirect('/');
    }

    res.render('register');
});

app.get('/error', (req, res) => {
    res.render('error');
});

app.post('/logout', (req, res) => {
    isLogin = false;
    res.redirect('/login');
});

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    const user = users.find(el => el.email === email);

    if(!user){
        return res.render('error', {error: "You are not registered yet"});
    }

    if(user.password !== password){
        return res.render('error', {error: "The password is wrong!!"});
    }

    isLogin = true;
    res.redirect('/');
});

app.post('/register', (req, res) => {
    const {name, email, password} = req.body;
    const user = users.find(el => el.email === email);

    if(user){
        return res.render('error', {error: "You are registered yet"});
    }

    users.push({name, email, password});
    isLogin = true;
    res.redirect('/');
});

app.listen(5000, () => {
    console.log('App is listened on 5000');
});
