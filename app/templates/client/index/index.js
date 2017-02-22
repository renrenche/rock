import Page from '../common';
import './style.less';

export default class Index extends Page {
    constructor() {
        super();
        console.log('Index\'s constructor is called');
    }
    init() {
        console.log('init');
    }
}

const index = new Index(); // eslint-disable-line
