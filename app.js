const express = require('express');
const app = express();

// express를 통해 만들어진 소스코드를 pretty화 한다.
app.locals.pretty = true;

// pug와 express 연결하기
app.set('view engine', 'pug');

// pug를 설치하는 경로(default값은 views폴더이다)
app.set('views', './views');

app.use(express.static('public'));

app.get('/topic/:id', (req, res) => {
    let topics = [
        'JavaScript is...',
        'NodeJs is...',
        'Express is...'
    ];

    let output = `
        <a href="/topic?id=0">JavaScript</a><br>
        <a href="/topic?id=1">NodeJs</a><br>
        <a href="/topic?id=2">Express</a><br><br>
        ${topics[req.params.id]}
    `;
    
    res.send(output);
});

app.get('/topic/:id/:mode', (req, res) => {
    res.send(req.params.id + ', ' + req.params.mode);
});

app.get('/template', (req, res) => {
    res.render('tmp', { title:'Pug', time: Date() });
});

app.get('/', (req, res) => {
    res.send('Hello home page!');
});

app.get('/dynamic', (req, res) => {
    let lis = '';
    let time = Date();

    for (let i = 0 ; i < 5; i++) {
        lis += '<li>coding</li>';
    }

    let output = 
    `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    <body>
        Hello, Dynamic!
        <ul>
        ${lis}
        </ul>
        ${time}
    </body>
    </html>`;
    res.send(output);
});

app.get('/route', (req, res) => {
    res.send('Hello Router, <img src="dice.jpg">');
});

app.get('/login', (req, res) => {
    res.send('<h1>Login please</h1>');
});

app.listen(3000, () => {
    console.log('Connected 3000 port!');
});