import React from 'react'
import {
    Router,
    Switch,
    Route,
} from 'react-router-dom'
import { createBrowserHistory } from 'history';

function outerWrapper(routes) {

    return (
        <Router history={createBrowserHistory()}>
            <Switch>
                {
                    routes.map(({ path, exact, layout: Layout, component: Component }, index) => {

                        return (
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

                    })
                }
            </Switch>
        </Router>
    );
}

const wrapperTemplate = ({ routes }) => {
    const wrapper = outerWrapper(routes)

    return wrapper;
}

export default wrapperTemplate
