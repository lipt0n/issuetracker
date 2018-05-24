import globalStyle from  "./global.scss"
import style0 from  "./login.scss"
import React, {Component} from 'react'
import  Router  from 'next/router'
import fetch from 'isomorphic-unfetch'


const style = {
    ...globalStyle,
    ...style0
}
const login_url = '/api/login'

 
export default class Login extends React.PureComponent {
    state = {
        username:'',
        password:''
    }

    shake = () => {
        document.getElementsByClassName(style.wrapper)[0].classList.add(style.shake)
        window.setTimeout(()=>{
            document.getElementsByClassName(style.wrapper)[0].classList.remove(style.shake)
        },500)
    }
    login = e => {
        e.preventDefault()
        console.log('sending: ', JSON.stringify({...this.state}))
        const headers = new Headers()
        headers.append('Accept', 'application/json')
        headers.append('Content-Type', 'application/json')
        headers.append('Access-Control-Allow-Credentials','true')
        fetch(login_url, {
            body: JSON.stringify({...this.state}),
            headers,
            method: 'POST',
            credentials: 'include'
           })
        .then(data => {
            console.log('then', data)
            if(!data.ok)  this.shake()
            else {
                Router.push('/')
            }
        }) 
        .catch(error => {
            console.log(error)
            this.shake()
        })
    }
    change = e => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    render(){
    
    return [<h1 key='header'>issue tracker  <span className={style.headerlogin}>login</span></h1>,
        <form key='loginform' action={login_url} method={'post'} className={style.mainContent} onSubmit={e=>this.login(e)}>
            <section className={style.container}>
                <label className={style.login_label} htmlFor="login"> login:  </label>
                <input  className={style.login_input} type="text" name="username" onChange={this.change}/>
                <label  className={style.password_label} htmlFor="password" >password: </label>
                <input type="password" name="password" className={style.password_input}  onChange={this.change} />
                <button>Login</button>
                
            </section>
        </form>]
    
      
       
    
    }
}