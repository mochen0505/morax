import React, { Children } from 'react'
import Ip from './utils/ip';
import Finger from './utils/finger';
import Cookie from 'js-cookie'

export default class GuidProvider extends React.Component {
    constructor() {
        super()
    }
    render() {
        const { children } = this.props

        return Children.only(children)
    }
    componentDidMount() {
        let lk = Cookie.get('lk')

        if (!lk) {
            Ip().then(ip => {
                if (ip) {
                    // 不让外部知道这个是用户本地的ip/加密ip
                    Cookie.set('lk', ip, {
                        path: '',
                        expires: 360
                    })
                }
            })
        }

        let fg = Cookie.get('fg')

        if (!fg) {
            Finger().then(finger => {
                if (finger) {
                    // 不让外部知道这个是设备指纹
                    Cookie.set('fg', finger, {
                        path: '',
                        expires: 360
                    })
                }
            })
        }
    }
}
