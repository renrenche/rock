import React from 'react';

export default class Example extends React.Component {
    state = {
        message: 'hello, <%= name %>',
    }

    render() {
        return (<h3>This is rendered by React: <br /> {this.state.message}</h3>);
    }
}
