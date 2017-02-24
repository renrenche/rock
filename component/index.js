var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
    /*
     * Running Loop
     * constructor -> prompting -> configuring -> default -> writing -> conflicts -> install -> end
     */
    prompting: function () {
        return this.prompt([
        {
            type: 'list',
            name: 'isPage',
            message: '你要创建什么类型的模块？',
            choices: ['页面级别模块', '页面下的子模块'],
            filter: val => {
                return {
                    '页面级别模块': true,
                    '页面下的子模块': false
                }[val];
            },
        },
        {
            type: 'input',
            name: 'name',
            message: '给你的组件起个名字吧？',
        },
        {
            type: 'list',
            name: 'type',
            message: '你想哪种方式(框架)来组织你的组件？(建议使用React, Vue 或 ES6)',
            choices: ['React', 'Vue', 'ES6_modules', 'CommonJs', 'AMD'],
            filter: val => {
              return {
                'React': 'react',
                'Vue': 'vue',
                'ES6_modules': 'es6',
                'CommonJs': 'commonjs',
                'AMD': 'amd',
              }[val];
            },
        },
        {
            type: 'confirm',
            name: 'js',
            message: '是否需要包含js文件？',
            when: answers => !answers.isPage
        },
        {
            type: 'confirm',
            name: 'template',
            message: '是否需要包含模板文件？',
            when: answers => !answers.isPage
        },
        {
            type: 'confirm',
            name: 'style',
            message: '是否需要包含样式文件?',
        },
        {
            type: 'input',
            name: 'dest',
            message: '最后，输入你想创建的位置吧: 子模块请输出入client/所在页面/component',
            when: answers => !answers.isPage,
        }
    ]).then(function (answers) {
            this.component = {
                name: answers.name,
                type: answers.type,
                dest: answers.dest || 'client',
                isPage: answers.isPage,
                needJs: answers.isPage || !!answers.js,
                needTemplate: answers.isPage || !!answers.template,
                needStyle: !!answers.style,
            };
        }.bind(this));
    },
    writing: function() {
        const { name, type, dest, isPage, needJs, needTemplate, needStyle } = this.component;

        if (!isPage && !needJs && !needTemplate && !needStyle) {
            console.log('你难道什么文件都不想创建？');
            return;
        }

        const destDir = `${dest}/${name}`;
        this.mkdir(destDir);
        if (needTemplate) {
            if (isPage) {
                this.fs.copyTpl(
                    this.templatePath('pageTemplate.ejs'),
                    this.destinationPath(`${destDir}/${name}.ejs`),
                    { name, type },
                    { delimiter: '?' }
                );
            } else {
                this.fs.copyTpl(
                    this.templatePath('componentTemplate.ejs'),
                    this.destinationPath(`${destDir}/${name}.ejs`),
                    { name, type },
                    { delimiter: '?' }
                );
            }
        }

        if (needStyle) {
            this.write(`${destDir}/style.less`, '');
        }

        if (needJs) {
            const className = name.split('-').map((item) => item.slice(0, 1).toUpperCase() + item.slice(1)).join('');
            switch(type) {
                case 'react':
                    this.fs.copyTpl(
                        this.templatePath('example.jsx'),
                        this.destinationPath(`${destDir}/index.jsx`),
                        { name: className }
                    );
                    if (isPage) {
                        this.fs.copyTpl(
                            this.templatePath('js_es6.js'),
                            this.destinationPath(`${destDir}/index.js`),
                            { name: className, isPage, type, needStyle }
                        );
                    }
                    break;
                case 'vue':
                    this.fs.copyTpl(
                        this.templatePath('example.vue'),
                        this.destinationPath(`${destDir}/index.vue`),
                        { name: className }
                    );
                    if (isPage) {
                        this.fs.copyTpl(
                            this.templatePath('js_es6.js'),
                            this.destinationPath(`${destDir}/index.js`),
                            { name: className, isPage, type, needStyle }
                        );
                    }
                    break;
                case 'es6':
                    this.fs.copyTpl(
                        this.templatePath('js_es6.js'),
                        this.destinationPath(`${destDir}/index.js`),
                        { name: className, isPage, type, needStyle }
                    );
                    break;
                case 'commonjs':
                    this.fs.copyTpl(
                        this.templatePath('js_cmj.js'),
                        this.destinationPath(`${destDir}/index.js`),
                        { name: className }
                    );
                    break;
                case 'amd':
                    this.fs.copyTpl(
                        this.templatePath('js_amd.js'),
                        this.destinationPath(`${destDir}/index.js`),
                        { name: className }
                    );
                    break;
            }
            // if there is a js, there must have a test file
            this.write(`${destDir}/index.spec.js`, '');
        }
    },
    end: {
    }
});
