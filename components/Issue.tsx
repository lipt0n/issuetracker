import React from 'react'
import Router from 'next/router'

const changeStatus = async (e, _id) => {
    e.preventDefault()
    if (confirm('are You sure?')) {
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
        } else alert('something went wrong ;(')
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
            <td>{_date.toUTCString()} </td>
            <td>{user && user.username}</td>
            <GetStatus status={status} onClick={e => changeStatus(e, _id)} />
            <td>{title}</td>
            <td>{description}</td>
        </tr>
    )
}
export {GetStatus}