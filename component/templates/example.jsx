import React from 'react';

export default class Example extends React.Component {
    state = {
        message: 'hello, <%= name %>',
    }

    render() {
        return (<h3>以下内容由React渲染 <br /> {this.state.message}</h3>);
    }
}
