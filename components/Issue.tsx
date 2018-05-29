import Headers from 'fetch-headers'
import Router from 'next/router'
import React from 'react'

const changeStatus = async (e, _id) => {
    e.preventDefault()
    if (window.confirm('are You sure?')) {
        const headers = new Headers()
        headers.append('Accept', 'application/json')
        headers.append('Content-Type', 'application/json')
        const response = await fetch('/api/changestatus', {
            body: JSON.stringify({
                _id,
            }),
            method: 'post',
            headers,
            credentials: 'same-origin',
        })
        if (response.ok) {
            Router.reload('/')
        } else window.alert('something went wrong ;(')
    }
}

const GetStatus = ({ status, onClick }) => {
    if (status === 'open')
        return (
            <td className={'open'}>
                <button onClick={onClick}>{status}</button>
            </td>
        )
    else if (status === 'pending')
        return (
            <td className={'pending'}>
                <button onClick={onClick}>{status}</button>
            </td>
        )
    return (
        <td className={'closed'}>
            <button>{status}</button>
        </td>
    )
}

export default ({ _id, date, status, title, description, user }) => {
    const _date = typeof date !== 'undefined' ? new Date(date) : new Date()
    return (
        <tr>
            <td className="issue_date">{_date.toUTCString()} </td>
            <td className="issue_user">{user && user.username}</td>
            <GetStatus status={status} onClick={e => changeStatus(e, _id)} />
            <td className="issue_title">{title}</td>
            <td className="issue_description">{description}</td>
        </tr>
    )
}
export { GetStatus }
