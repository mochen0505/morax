import React from 'react'
import {
    Router,
    Switch,
    Route,
} from 'react-router-dom'
import { createBrowserHistory } from 'history';

const plugins = []

export function pluginsRegistry(item) {
    plugins.push(item)
}

const pluginsWrapper = (type, children, props) => {
    let wrapper = children

    plugins.forEach(item => {
        const { plugin, opt } = item
        const wrapperMethod = plugin[type]

        if (typeof wrapperMethod === 'function') {
            wrapper = wrapperMethod(wrapper, opt, props)
        }
    })
    return wrapper;
}

function routerWrapper(routes) {

    return (
        <Router history={createBrowserHistory()}>
            <Switch>
                {
                    routes.map(({ path, exact, layout: Layout, component: Component }, index) => {

                        const router = (
                            <Route
                                key={index}
                                path={path}
                                exact={exact}
                                render={(props) => (
                                    <Layout {...props}>
                                        <Component {...props}/>
                                    </Layout>
                                )}
                            />
                        );

                        return pluginsWrapper('inner', router);
                    })
                }
            </Switch>
        </Router>
    );
}

const wrapperTemplate = ({ routes }) => {
    const router = routerWrapper(routes)
    const template = pluginsWrapper('outer', router)

    return (
        // default hoc provider goes here
        <>
            {template}
        </>
    );
}

export default wrapperTemplate
