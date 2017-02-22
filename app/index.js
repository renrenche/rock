var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
    /*
     * Running Loop
     * constructor -> prompting -> configuring -> default -> writing -> conflicts -> install -> end
     */
    prompting: function () {
        return this.prompt([
            {
                type    : 'input',
                name    : 'name',
                message : '为你的项目起个名字吧？',
                default : this.appname // Default to current folder name
            },
        ]).then(function (answers) {
            this.props = answers;
            this.log('app', answers.name, 'has been created!');
            this.log('Happy Coding! You can look for docs at https://github.com/orange727/rock/README.md');
        }.bind(this));
    },
    // 配置文件
    configuring: {
        readme: function() {
            this.fs.copy(
                this.templatePath('README.md'),
                this.destinationPath('README.md')
            );
        },
        packageJson: function() {
            this.fs.copyTpl(
                this.templatePath('package.json'),
                this.destinationPath('package.json'), {
                    name: this.props.name
                }
            );
        },
        editConfig: function() {
            this.fs.copyTpl(
                this.templatePath('config/*'),
                this.destinationPath('config'), {
                    name: this.props.name
                }
            );
        },
        config: function() {
            this.fs.copyTpl(
                this.templatePath('.editorconfig'),
                this.destinationPath('.editorconfig'), {
                    name: this.props.name.toUpperCase()
                }
            );
        },
        lint: function() {
            this.fs.copy(
                this.templatePath('.eslintrc.js'),
                this.destinationPath('.eslintrc.js')
            );

            this.fs.copy(
                this.templatePath('.stylelintrc.js'),
                this.destinationPath('.stylelintrc.js')
            );
        },
        git: function() {
            this.fs.copy(
                this.templatePath('.npmignore'),
                this.destinationPath('.gitignore')
            );
        },
        build: function() {
            this.fs.copyTpl(
                this.templatePath('gulpfile.js'),
                this.destinationPath('gulpfile.js'), {
                    name: this.props.name,
                }
            );
            this.fs.copyTpl(
                this.templatePath('webpack/*'),
                this.destinationPath('webpack'), {
                    name: this.props.name,
                }
            );
        },
        deploy: function() {
            this.fs.copyTpl(
                this.templatePath('scripts/**/*'),
                this.destinationPath('scripts'), {
                    name: this.props.name
                }
            );
        },
        babel: function() {
            this.fs.copy(
                this.templatePath('.babelrc'),
                this.destinationPath('.babelrc')
            );
        },
    },
    // write routes, controllers, clients files
    writing: {
        server: function() {
            this.fs.copy(
                this.templatePath('index.js'),
                this.destinationPath('index.js')
            );
            this.fs.copy(
                this.templatePath('server/**/*'),
                this.destinationPath('server')
            );
        },
        client: function() {
            this.fs.copyTpl(
                this.templatePath('client/**/*'),
                this.destinationPath('client'),
                { name: this.props.name },
                { delimiter: '?' }
            );
        },
        test: function() {
            this.fs.copy(
                this.templatePath('tests/**/*'),
                this.destinationPath('tests')
            );
        }
    },
    install: {
        installDeps: function() {
            this.installDependencies({
                npm: true,
                bower: false,
                callback: function() {
                    console.log('npm is installed!');
                }
            });
        }
    },
    end: {
    }
});
