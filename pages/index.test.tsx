import 'jsdom-global/register'
import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
const chai = require('chai')
const { expect } = chai
chai.use(require('chai-like'))
chai.use(require('chai-things'))

import App from './index'
describe('index', () => {
    before('configure', () => {
        Enzyme.configure({ adapter: new Adapter() })
    })
    it('should render component with issue', () => {
        const issues = [
            {
                _id: 'string',
                date: new Date(),
                status: 'open',
                user: {
                    _id: 'ddddd',
                    username: 'username',
                },
                title: 'string',
                description: 'String',
            },
        ]
        const url = {
            pathname: '/',
            query: {
                new: false,
            },
        }
        const wrapper = Enzyme.mount(
            <div id="dummyWrap">
                <App issues={issues} url={url} />
            </div>
        )
        expect(wrapper).to.have.length(1)
        expect(wrapper.find('h1')).to.have.length(1)
        expect(wrapper.find('table tbody tr')).to.have.length(1)
        expect(wrapper.find('table tbody tr td')).to.have.length(5)
    })
    it('should render component with issues', () => {
        const issues = [
            {
                _id: 'string',
                date: new Date(),
                status: 'open',
                user: {
                    _id: 'ddddd',
                    username: 'username',
                },
                title: 'string',
                description: 'String',
            },
            {
                _id: 'string2',
                date: new Date(),
                status: 'pending',
                user: {
                    _id: 'ddddd',
                    username: 'username',
                },
                title: 'string',
                description: 'String',
            },
        ]
        const url = {
            pathname: '/',
            query: {
                new: false,
            },
        }
        const wrapper = Enzyme.mount(
            <div id="dummyWrap">
                <App issues={issues} url={url} />
            </div>
        )
        expect(wrapper).to.have.length(1)
        expect(wrapper.find('h1')).to.have.length(1)
        expect(wrapper.find('table tbody tr')).to.have.length(2)
        expect(wrapper.find('table tbody tr td')).to.have.length(10)
    })
    it('should render component without issue', () => {
        const url = {
            pathname: '/',
            query: {
                new: false,
            },
        }
        const wrapper = Enzyme.mount(
            <div id="dummyWrap">
                <App url={url} />
            </div>
        )
        expect(wrapper).to.have.length(1)
        expect(wrapper.find('h1')).to.have.length(1)
        expect(wrapper.find('table tbody tr')).to.have.length(0)
    })
    it('should render modal', () => {
        const url = {
            pathname: '/',
            query: {
                new: true,
            },
        }
        const wrapper = Enzyme.mount(
            <div id="dummyWrap">
                <App url={url} />
            </div>
        )
        expect(wrapper).to.have.length(1)
        expect(wrapper.find('New')).to.have.length(1)
    })
})
