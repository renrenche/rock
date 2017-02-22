var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
    /*
     * Running Loop
     * constructor -> prompting -> configuring -> default -> writing -> conflicts -> install -> end
     */
    prompting: function () {
        return this.prompt([
        {
            type: 'input',
            name: 'router',
            message: '路由是？',
        },
        {
            type: 'input',
            name: 'template',
            message: '模板是？',
        },
    ]).then(function (answers) {
            this.component = {
                router: answers.router,
                template: answers.template,
            };
        }.bind(this));
    },
    writing: function() {
        const { router, template } = this.component;

        this.fs.copyTpl(
            this.templatePath('example.js'),
            this.destinationPath(`server/controllers/${template}.js`), {
                router,
                template,
            }
        );
    },
    end: {
    }
});
