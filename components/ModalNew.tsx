import React from 'react'
import Router from 'next/router'
import New from '../pages/new'
export default class extends React.Component<any,any> {
    _shim = null
    dismiss = e => {
        if (this._shim === e.target) {
            Router.push('/')
        }
    }
    render() {
        return (
            <div ref={el => (this._shim = el)} className={'shim'} onClick={this.dismiss}>
                <div className={'content'}>
                    <New />
                </div>
            </div>
        )
    }
}
