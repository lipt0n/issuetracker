import 'jsdom-global/register'
import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
const chai = require('chai')
const { expect } = chai
chai.use(require('chai-like'))
chai.use(require('chai-things'))

import ModalNew from './ModalNew'
describe('ModalNew component', () => {
    before('configure', () => {
        Enzyme.configure({ adapter: new Adapter() })
    })
    it('should render component', () => {
        
        const wrapper = Enzyme.mount(
            <div id="dummyWrap">
                <ModalNew />
            </div>
        )
        expect(wrapper).to.have.length(1)
        expect(wrapper.find('New')).to.have.length(1)
    })
})
