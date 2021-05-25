import React from 'react'
import GuidProvider from './src/provider';

const Guid = {
    name: 'guid',
    outer(children) {
        return <GuidProvider>{children}</GuidProvider>
    }
}

export default Guid