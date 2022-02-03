import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from '@morax/shield-perf';
import WrapperTemplate from './template';
import { pluginsRegistry } from "./template";

export default class Launcher extends Component {
    constructor(props) {
        super(props)
    }

    start(opts) {

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

        if (opts && opts.perf) {
            reportWebVitals(console.log)
        }
    }

    use(plugin, opt) {
        pluginsRegistry({
            plugin,
            opt,
        })
    }
}

