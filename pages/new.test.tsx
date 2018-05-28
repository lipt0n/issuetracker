import 'jsdom-global/register'
import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
const chai = require('chai')
const { expect } = chai
chai.use(require('chai-like'))
chai.use(require('chai-things'))
const  fetchMock = require('fetch-mock')
import Router from 'next/router'

import New from './new'
describe('new issue window', () => {
    before('configure', () => {
        Enzyme.configure({ adapter: new Adapter() })
        fetchMock.restore()
        fetchMock.post('*', (url, opts)=>{
            const body = JSON.parse(opts.body)
            if(body.description.length>0  && body.title.length>0)
            return {body:{status:'ok'}}
            return {status:503}
        })
    })
    it('should render component', () => {
        const wrapper = Enzyme.mount(
            <div id="dummyWrap">
                <New />
            </div>
        )
        expect(wrapper).to.have.length(1)
        expect(wrapper.find('h1')).to.have.length(1)
        expect(wrapper.find('button')).to.have.length(1)
    })
    it('should add new issue', done => {
        const wrapper = Enzyme.mount(
            <div id="dummyWrap">
                <New />
            </div>
        )
        //@ts-ignore
        Router.push =  ()=>done()
        wrapper.find('[name="description"]').simulate('change', {target: {name:'description', value: 'dadasthfdhf'}})
        wrapper.find('[name="title"]').simulate('change', {target: {name:'title', value: 'sfsdfsdf sfgegrrefgr dsfs'}})
        wrapper.find('form').simulate('submit')
    })

})
