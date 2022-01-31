import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom'

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
        <BrowserRouter>
            <Routes>
                {
                    routes.map(({ path, exact, layout: Layout, component: Component }, index) => {

                        const router = (
                            <Route
                                key={index}
                                path={path}
                                exact={exact}
                                element={
                                    <Layout>
                                        <Component/>
                                    </Layout>
                                }
                            />
                        );

                        return pluginsWrapper('inner', router);
                    })
                }
            </Routes>
        </BrowserRouter>
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
