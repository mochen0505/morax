import React, { Component, Children } from 'react'
import * as Sentry from '@sentry/react'
import { Integrations } from "@sentry/tracing";

class ExceptionReporerProvider extends Component {
    constructor(props) {
        super(props)
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

    // 捕捉上报全局异常
    componentDidCatch(error, errorInfo) {
        const scopeExceptionMaker = scope => {
            scope.setExtras(errorInfo)
            return error
        }
        if (!scopeExceptionMaker || typeof scopeExceptionMaker !== 'function') {
            return;
        }
        Sentry.withScope(scope => {
            const scopeException = scopeExceptionMaker(scope)

            if (scopeException) {
                Sentry.captureException(scopeException)
            }
        });
        console.log(error)
    }

    render() {
        const { children } = this.props

        return Children.only(children)
    }
}
export default ExceptionReporerProvider

