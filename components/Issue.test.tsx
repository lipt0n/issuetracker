import 'jsdom-global/register'
import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
const chai = require('chai')
const { expect } = chai
chai.use(require('chai-like'))
chai.use(require('chai-things'))

import {GetStatus} from './Issue'
import Issue from './Issue'
const  fetchMock = require('fetch-mock')

describe('Issue component', () => {
    before('configure', () => {
        Enzyme.configure({ adapter: new Adapter() })
    })
    it('should render component', () => {
        const issue = {
            _id: 'string',
            date: new Date(),
            status: 'open',
            user: {
                _id:'ddddd',
                username:'username'
            },
            title: 'string',
            description: 'String'
        
        }
        const wrapper = Enzyme.mount(
            <table><tbody>
                <Issue   {...issue} />
            </tbody></table>
        )
        expect(wrapper).to.have.length(1)
        expect(wrapper.find('td')).to.have.length(5)
    })
    it('should show status',()=>{
        const wrapper = Enzyme.mount(
            <table><tbody><tr>
                <GetStatus status='open' onClick={()=>{}} />
            </tr></tbody></table>
        )
        expect(wrapper).to.have.length(1)
        expect(wrapper.find('td')).to.have.length(1)
        expect(wrapper.find('button')).to.have.length(1)
    })
    it('should handle click on open status',()=>{
        let spy = false
        let spyFunc = ()=>{ spy=true }
        const wrapper = Enzyme.mount(
            <table><tbody><tr>
                <GetStatus status='open' onClick={spyFunc} />
            </tr></tbody></table>
        )
        expect(wrapper).to.have.length(1)
        expect(wrapper.find('td.open')).to.have.length(1)
        expect(spy).to.be.false
        wrapper.find('button').simulate('click')
        expect(spy).to.be.true
    })
    it('should handle click on pending status',()=>{
        let spy = false
        let spyFunc = ()=>{ spy=true }
        const wrapper = Enzyme.mount(
            <table><tbody><tr>
                <GetStatus status='pending' onClick={spyFunc} />
            </tr></tbody></table>
        )
        expect(wrapper).to.have.length(1)
        expect(wrapper.find('td.pending')).to.have.length(1)
        expect(spy).to.be.false
        wrapper.find('button').simulate('click')
        expect(spy).to.be.true
    })
    it('should not handle click on closed status',()=>{
        let spy = false
        let spyFunc = ()=>{ spy=true }
        const wrapper = Enzyme.mount(
            <table><tbody><tr>
                <GetStatus status='closed' onClick={spyFunc} />
            </tr></tbody></table>
        )
        expect(wrapper).to.have.length(1)
        expect(spy).to.be.false
        wrapper.find('button').simulate('click')
        expect(spy).to.be.false
    })
})
