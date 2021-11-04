import React, { Component, Children } from 'react'
import * as Sentry from '@sentry/react'
import { Integrations } from "@sentry/tracing";

class SentryProvider extends Component {
    constructor(props) {
        super(props)

        this.state = {
            error: null
        }
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { error: error }
    }

    componentDidMount() {
        // Sentry初始化
        Sentry.init({
            dsn: "http://1a8012da4a78483ba73bba9b47c46130@localhost:9000/2",
            integrations: [new Integrations.BrowserTracing()],

            // Set tracesSampleRate to 1.0 to capture 100%
            // of transactions for performance monitoring.
            // We recommend adjusting this value in production
            tracesSampleRate: 1.0,
        });
    }

    render() {
        if (this.state.error) {
            return (
                <>
                    <p>something went wrong</p>
                    <p>{ this.state.error.message }</p>
                </>
            )
        }
        const { children } = this.props

        return Children.only(children)
    }
}
export default SentryProvider

