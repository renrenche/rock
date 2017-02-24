<% if (type === 'vue') { %>import Vue from 'vue';
import App from './index.vue';<% } %><% if (type === 'react') { %>import React from 'react';
import ReactDOM from 'react-dom';
import App from './index.jsx';<% } %><% if (isPage) { %>
import Page from '../common';<% } %><% if (needStyle) { %>
import './style.less';<% } %>

<% if (isPage) { %>export default class <%= name %> extends Page {<% } else { %>export default class <%= name %> {<% } %>
    constructor() {
        super();
        console.log('<%= name %>\'s constructor is called');<% if (isPage && type === 'vue') { %>
        this.renderVue();<% } %><% if (isPage && type === 'react') { %>
        this.renderReact();<% } %>
    }<% if (isPage && type === 'vue') { %>
    renderVue() {
        // eslint suggest not to use the new keyword if it hasn't been assigned to a variable.
        // so we just extend Vue with a create function in common/index.js to avoid using eslint-disable-line
        Vue.create({
            el: '#app',
            render: h => h(App)
        });
    }<% } %><% if (isPage && type === 'react') { %>
    renderReact() {
        ReactDOM.render(
            <App />,
            document.getElementById('app')
        );
    }<% } %>
}

<% if (isPage) { %>new <%= name %>(); // eslint-disable-line<% } %>
