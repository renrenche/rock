import Vue from 'vue';
import './style.less';

export default class Page {
    constructor() {
        console.log('Page\'s constructor is called');
        this.initVueFn();
    }
    initVueFn() {
        Vue.create = function (options) {
            return new Vue(options);
        };
    }
}
