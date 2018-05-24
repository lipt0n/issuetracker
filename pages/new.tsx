import React from 'react'
import Router from 'next/router'

const url = '/api/new'

export default class New extends React.Component {
    state = {
        username: '',
        password: '',
    }

    shake = () => {
        document.getElementsByClassName('mainContent')[0].classList.add('shake')
        window.setTimeout(() => {
            document.getElementsByClassName('mainContent')[0].classList.remove('shake')
        }, 500)
    }
    submit = e => {
        e.preventDefault()
        const headers = new Headers()
        headers.append('Accept', 'application/json')
        headers.append('Content-Type', 'application/json')
        headers.append('Access-Control-Allow-Credentials', 'true')
        fetch(url, {
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
            <h1 key="header">new issue </h1>,
            <div key="issueform" className="mainContent">
                <form action={url} method={'post'} onSubmit={e => this.submit(e)}>
                    <div className="row">
                        <label htmlFor="title"> title: </label>
                        <input maxLength={150} type="text" name="title" onChange={this.change} />
                    </div>
                    <div className="row">
                        <label htmlFor="description">description: </label>
                        <textarea maxLength={1500} name="description" onChange={this.change} />
                    </div>
                    <div className="row">
                        <button>Report new issue</button>
                    </div>
                </form>
            </div>,
        ]
    }
}
