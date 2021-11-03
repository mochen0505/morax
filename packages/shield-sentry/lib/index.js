import React from 'react'
import SentryProvider from './src/provider'
const ExceptionReporter = {
    name: 'sentry',
    outer(children) {
        return <SentryProvider>{children}</SentryProvider>
    }
}

export default ExceptionReporter
