import Link from 'next/link'
import React from 'react'
import globalStyle from  './global.scss'
import {ButtonAdd} from '../components/ButtonAdd'
import ModalNew from '../components/ModalNew'
import fetch from 'isomorphic-unfetch'
import Headers from 'fetch-headers'
import  Router  from 'next/router'
import Issue from '../components/Issue'
export default class App extends React.Component {
    static async getInitialProps({ req, res }) {
        if ( res ){
            if(!res.issues) return {issues:[]}
            const result = await res.issues.toArray()
            return {
                issues:result
            }
            



        } else {
            const headers = new Headers()
            headers.append('Accept', 'application/json')
            headers.append('Content-Type', 'application/json')
            const response = await fetch('/api/issues', {
                headers,
                credentials: 'include'
            })
            console.log('trying to get issues, status:', response.status)
            if(response.status!==200){
                Router.push('/login')
                return {}
                
            } else {
                const json = await response.json()
                return { statusCode:200, issues: json}
            }
        }
        
        
      }
  
    render () {
        const {url,issues} = this.props
        const results =  []
    results.push(<h1 key="header">Issue Tracker </h1>)
    results.push(<ButtonAdd key="addNewIssueBtn" />)
    if(url.query.new)
        results.push(<ModalNew key="newModal"/>)
    if(issues)
        results.push(<div key='issues' className={globalStyle.issuesWrap}>
            <table className={globalStyle.issues}>
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
           {issues.map(issue=>{
               return <Issue key={issue._id} {...issue}/>
            })}
            </tbody>
            </table>
        </div>)
    return results
        }
    
    }

