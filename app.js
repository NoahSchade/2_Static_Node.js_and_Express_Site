const express = require('express');
const router = express.Router;
const path = require('path');
const data = require('./data.json');
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'pug');

// app.use((req, res, next) => {
//     const err = new Error();
//     err.status = 500;
//     next(err);
// });

app.use(express.static('.'));

app.get('/live/:num', (req, res) => {
    const projectNum = [req.params.num];

    res.sendFile('projects/project_' + projectNum + '/index.html', {
        root: path.join(__dirname, './')
    });
});

app.get('/', (req, res) => {     
    const project = data.projects;
    res.render('index', {
        project: project
    });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/project/:id', (req, res) => {
    const project = data.projects[req.params.id];
    res.render('project', {
        project_name: project.project_name,
        description: project.description,
        technologies: project.technologies,
        live_link: project.live_link,
        github_link: project.github_link,
        image_urls: project.image_urls
    });
});

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    console.log('We could not find the page you requested!');
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});

app.listen(port, () => {
    console.log("Server running at http://oursite:" + port + "/");
});