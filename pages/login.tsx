import React from 'react'
import Router from 'next/router'
import Headers from 'fetch-headers'

const login_url = '/api/login'

export default class Login extends React.PureComponent {
    state = {
        username: '',
        password: '',
    }

    shake = () => {
        document.getElementsByClassName('wrapper')[0].classList.add('shake')
        window.setTimeout(() => {
            document.getElementsByClassName('wrapper')[0].classList.remove('shake')
        }, 500)
    }
    login = e => {
        e.preventDefault()
        const headers = new Headers()
        headers.append('Accept', 'application/json')
        headers.append('Content-Type', 'application/json')
        headers.append('Access-Control-Allow-Credentials', 'true')
        fetch(login_url, {
            body: JSON.stringify({ ...this.state }),
            headers,
            method: 'POST',
            credentials: 'same-origin',
        })
            .then(data => {
                if (!data.ok) this.shake()
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
            [e.target.name]: e.target.value,
        })
    }
    render() {
        return [
            <h1 key="header">
                issue tracker <span className={'headerlogin'}>login</span>
            </h1>,
            <form
                key="loginform"
                action={'login_url'}
                method={'post'}
                className={'mainContent'}
                onSubmit={e => this.login(e)}
            >
                <section className={'container'}>
                    <label className={'login_label'} htmlFor="login">
                        {' '}
                        login:{' '}
                    </label>
                    <input
                        className={'login_input'}
                        type="text"
                        name="username"
                        onChange={this.change}
                    />
                    <label className={'password_label'} htmlFor="password">
                        password:{' '}
                    </label>
                    <input
                        type="password"
                        name="password"
                        className={'password_input'}
                        onChange={this.change}
                    />
                    <button>Login</button>
                </section>
            </form>,
        ]
    }
}
