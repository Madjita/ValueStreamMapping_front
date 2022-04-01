import  React from 'react'
import Example from '../PageExample/Example'
import { Switch, Route } from 'react-router-dom'

const PageExample = () =>
{
    return (
        <Route exact path='/pageExample' component={Example}/>
    ) 
}

export default PageExample;