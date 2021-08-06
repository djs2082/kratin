import React,{Component} from 'react'
import { NavLink } from 'react-router-dom';
import { Button,Layout,Card } from 'antd';

class LandingComponent extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
        }
    }


render()
{
    return(
<div className="card">

<button className="btn btn-info btn-lg"><NavLink to="/patient_login"> Patient Login</NavLink></button>
<hr></hr>
<button className="btn btn-info btn-lg"><NavLink to="/doctor_login"> Doctor Login</NavLink></button>

</div>
    )
}
}
export default(LandingComponent)