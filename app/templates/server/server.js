const fs = require('fs');
const glob = require('glob');
const path = require('path');
const util = require('util');
const config = require('config');
const moment = require('moment');
const morgan = require('morgan');
const express = require('express');
const engine = require('ejs-mate');
const winston = require('winston');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const FileStreamRotator = require('file-stream-rotator');

const logger = winston;
const app = express();

/*
 * Globales
 */
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEVELOPMENT__ = ['development', 'test'].indexOf(process.env.NODE_ENV) > -1;

/*
 * Security related
 */
app.disable('x-powered-by');
app.set('trust proxy', true);

/*
 * Logger
 * overwrite morgan datetime to China TimeZone
 * https://github.com/expressjs/morgan/issues/13
 */
morgan.token('date', function () {
    return moment().format(config.log.timeFormat || 'YYYY-MM-DD HH:mm:ss');
});

if (__DEVELOPMENT__) {
    app.use(morgan('dev'));
    winston.remove(winston.transports.Console);
    winston.add(winston.transports.Console, { colorize: true, level: 'debug', json: false });
} else {
    const logFolder = path.dirname(config.log.logPath);
    try {
        fs.mkdirSync(logFolder);
        logger.info('log folder created', logFolder);
    } catch (err) {
        logger.info('log folder already exist', logFolder);
    }
    app.use(morgan(config.log.logFormat, {
        stream: FileStreamRotator.getStream({  // eslint-disable-line
            date_format: 'YYYY-MM-DD',
            filename: `${path.dirname(config.log.logPath)}/access.log.%DATE%`,
            frequency: 'daily',
            verbose: false,
        })
    }));

    winston.remove(winston.transports.Console);
    winston.add(require('winston-daily-rotate-file'), {
        filename: config.log.logPath,
        dirname: path.dirname(config.log.logPath),
        datePattern: '.yyyy-MM-dd',
        colorize: false,
        level: 'debug',
        json: true,
        timestamp() {
            return moment().format(config.log.timeFormat || 'YYYY-MM-DD HH:mm:ss');
        },
    });
}

/*
 * Template
 */
app.set('view engine', 'ejs');
app.engine('ejs', engine);
app.set('views', __DEVELOPMENT__ ? `${config.root}/client` : `${config.root}/server/compiled/views`);

/*
 * default middlewares
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cookieParser());

/*
 * Router
 */
const routes = glob.sync(`${config.root}/server/routes/*.js`);
routes.forEach((route) => {
    require(route)(app);
});


/*
 * Server static files
 */
if (__DEVELOPMENT__) {
    app.use(express.static(`${config.root}/public`));
}

/*
 * Healthcheck for SLB
 */
app.use('/healthcheck', (req, res) => {
    res.status(200).send('I am alive');
});

/*
 * Otherwise, return 404
 */
app.use((req, res) => {
    res.status(404).send(`Request URL ${req.url} Not Found`);
});

/*
 * Debugger
 */
if (__DEVELOPMENT__) {
    require('express-debug')(app, { depth: 10 });
}

/*
 * Error Handling
 */
app.use((err, req, res, next) => { // eslint-disable-line
    logger.error(util.inspect({
        url: req.originalUrl,
        error: err,
        headers: req.headers,
        params: req.params,
        query: req.query,
    }, { depth: 4, color: true }));

    if (req.path.indexOf('/api/') === 0) {
        res.status(200).jsonp({ status: 500, errmsg: err.message || err.toString() });
    } else if (__DEVELOPMENT__) {
        res.send(`<pre>${err.stack}</pre>`);
    } else {
        res.status(500).send('Something broke!');
    }
});

app.listen(config.ports.server, function (err) {
    if (err) {
        console.error(err);
    }
    console.info('\n==> ✅  %s is running, talking to API server on %s.', config.app.title, config.ports.server);
    console.info('==> 💻  Open http://localhost:%s in a browser to view the app.', config.ports.assets);
});

// Export server for test use
module.exports = {
    server: app,
};
