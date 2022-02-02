import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import WrapperTemplate from './template';
import { pluginsRegistry } from "./template";

export default class Launcher extends Component {
    constructor(props) {
        super(props)
    }

    start() {

        const {
            routes,
        } = this.props

        const rootElement = document.querySelector('#root')
        const render = ReactDOM.render;

        render(
            <WrapperTemplate
                routes={routes}
            />,
            rootElement
        )
    }

    use(plugin, opt) {
        pluginsRegistry({
            plugin,
            opt,
        })
    }
}

