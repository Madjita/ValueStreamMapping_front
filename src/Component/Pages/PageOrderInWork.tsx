import  React from 'react'
import CustomizedAccordions from '../CustomizedAccordions'
import { Switch, Route } from 'react-router-dom'

const PageOrderInWork = () =>
{
    return (
        <Route exact path='/orderInWork' component={CustomizedAccordions}/>
    ) 
}

export default PageOrderInWork;