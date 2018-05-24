import 'jsdom-global/register'
import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
const chai = require('chai')
const { expect } = chai
chai.use(require('chai-like'))
chai.use(require('chai-things'))

import {ButtonAdd} from './ButtonAdd'
describe('ButtonAdd component', () => {
    before('configure', () => {
        Enzyme.configure({ adapter: new Adapter() })
    })
    it('should render component', () => {
        const wrapper = Enzyme.mount(
            <div id="dummyWrap">
                <ButtonAdd />
            </div>
        )
        expect(wrapper).to.have.length(1)
        expect(wrapper.find('a')).to.have.length(1)
    })
})
