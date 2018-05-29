import Headers from 'fetch-headers'
import fetch from 'isomorphic-unfetch'
import Router from 'next/router'
import React from 'react'

import { ButtonAdd } from '../components/ButtonAdd'
import Issue from '../components/Issue'
import ModalNew from '../components/ModalNew'

interface User {
    _id: string
    username: string
}
interface Issue {
    _id: string
    date: Date
    status: string
    user: User
    title: string
    description: String
}
interface Context {
    err?: Error
    pathname: string
    query?: {
        [key: string]: boolean | boolean[] | number | number[] | string | string[]
    }
}
type MyComponentProps = {
    url: Context
    issues?: Issue[]
}
export default class App extends React.Component<MyComponentProps, any> {
    static async getInitialProps({ req, res }) {
        if (res) {
            if (!res.issues) return { issues: [] }
            const result: Issue[] = await res.issues.toArray()
            return {
                issues: result,
            }
        } else {
            const headers = new Headers()
            headers.append('Accept', 'application/json')
            headers.append('Content-Type', 'application/json')
            const response = await fetch('/api/issues', {
                headers,
                credentials: 'same-origin',
            })
            if (response.status !== 200) {
                Router.push('/login')
                return {}
            } else {
                const json = await response.json()
                return { statusCode: 200, issues: json }
            }
        }
    }

    render() {
        const { url, issues } = this.props
        const results = []
        results.push(<h1 key="header">Issue Tracker </h1>)
        results.push(<ButtonAdd key="addNewIssueBtn" />)
        if (typeof url !== 'undefined' && url.query.new) results.push(<ModalNew key="newModal" />)
        if (issues)
            results.push(
                <div key="issues" className={'issuesWrap'}>
                    <table className={'issues'}>
                        <thead>
                            <tr>
                                <th>date</th>
                                <th>user</th>
                                <th>status</th>
                                <th>title</th>
                                <th>description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {issues.map(issue => {
                                return <Issue key={issue._id} {...issue} />
                            })}
                        </tbody>
                    </table>
                </div>
            )
        return results
    }
}
