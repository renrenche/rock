const path = require('path');

module.exports = {
    app: {
        title: '<%= name %>',
    },
    ports: {
        server: process.env.PORT || 7000,
        assets: process.env.ASSET_PORT || 8081,
        livereload: 8010,
    },
    root: path.normalize(`${__dirname}/..`),
    log: {
        logPath: './logs/framework.log',
        logFormat: 'date=:date[iso] | ip=:remote-addr | method=:method | url=:url | status=:status | time=:response-time | bytes=:res[content-length] | referrer=":referrer" | user-agent=":user-agent" | cookie=":req[cookie]"',      // eslint-disable-line
    },
    cdn: {
        qiniu: {
            private: false,
            bucket: '',
            accessKey: '',
            secretKey: '',
        },
        domain: '//www.<%= name %>..com/',
        prefix: '<%= name %>/dist/',
    },
};
