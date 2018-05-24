import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
const chai = require('chai')
const {expect} = chai
chai.use(require('chai-like'))
chai.use(require('chai-things'))
import New from './new'
//let ComponentA = require('./new.tsx').New
describe('new issue window',()=>{
    before('configure',()=>{
        Enzyme.configure({ adapter: new Adapter() })
    })
    it('should render component',()=>{
        
        console.log(typeof(New))
        console.log(New)
      //  const wrapper = Enzyme.shallow(<New/>)
       // expect(wrapper).to.have.length(2)
    })
    
})