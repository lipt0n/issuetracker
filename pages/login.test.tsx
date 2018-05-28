import 'jsdom-global/register'
import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
const chai = require('chai')
const { expect } = chai
chai.use(require('chai-like'))
chai.use(require('chai-things'))
const fetchMock = require('fetch-mock')
const sinon = require('sinon')

import Login from './login'
import Router from 'next/router'

describe('new login window', () => {
    before('configure', () => {
        Enzyme.configure({ adapter: new Adapter() })
        fetchMock.restore()
        fetchMock.post('*', (url, opts) => {
            const body = JSON.parse(opts.body)
            if (body.username == 'user1' && body.password == 'password')
                return { body: { status: 'ok' } }
            return { status: 403 }
        })
    })
    it('should render component', () => {
        const wrapper = Enzyme.mount(
            <div className="wrapper">
                <Login />
            </div>
        )
        expect(wrapper).to.have.length(1)
        expect(wrapper.find('h1')).to.have.length(1)
        expect(wrapper.find('button')).to.have.length(1)
    })
    it('should try to login', done => {
        const wrapper = Enzyme.mount(<Login />)
        const instance = wrapper.instance()
        instance.shake = () => done()
        //const shakeSpy = sinon.spy(wrapper.instance(), "shake")
        wrapper
            .find('.login_input')
            .simulate('change', { target: { name: 'username', value: 'user1' } })
        wrapper
            .find('.password_input')
            .simulate('change', { target: { name: 'password', value: 'password1' } })
        wrapper.find('form').simulate('submit')
    })
    it('should login', done => {
        const wrapper = Enzyme.mount(<Login />)
        //@ts-ignore
        Router.push = () => done()
        wrapper
            .find('.login_input')
            .simulate('change', { target: { name: 'username', value: 'user1' } })
        wrapper
            .find('.password_input')
            .simulate('change', { target: { name: 'password', value: 'password' } })
        wrapper.find('form').simulate('submit')
    })
})
