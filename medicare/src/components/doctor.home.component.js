import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import configData from '../config/config.json'

class DoctorHome extends Component {
	constructor(props) {
		super(props)
		if(sessionStorage.getItem('token') === null)
		{
			this.props.history.push('/patient_login')
		}		this.state = {
			"requests":
			[]
		}
	}

	componentDidMount=()=>{
		var API_URL='http://127.0.0.1:8000'
		const headers = { 'Authorization': 'Token ' + sessionStorage.getItem('token') }
		axios.get(configData.api_end_point+'/treatment/get_requests/',{headers:headers})
        .then(response => {
			console.log(response.status)
            if (response.status === 200) {
				console.log("inside")
				console.log(response.data.Data)
				this.setState({'requests':response.data.Data})
				console.log(this.state)
            }
            else {
                alert("erro occurred: Unknown error occurred")
                return([])
            }

        })
        .catch(error => {
            alert("error occurred "+error.toString())
        });
	}

    handleTreatment=(e)=>{
        var key=e.currentTarget.getAttribute("data-key");
        var request=this.state.requests.filter(request=>{
            if(request.id==key)
            {
                return request
            }
        })
        console.log(request)
        this.props.history.push({pathname:'/treatment',state:{'patient':request}})
    }
	update_rows = (response) => {
		try {
		  let columns = this.state.Symptoms.columns
		  let rows = this.state.Symptoms.rows
		  response.forEach(element => { 
			console.log(element)
			element.clickEvent=() => this.handleClick()
			element.hover=()=>()=>{console.log("hillo")}
			rows.push(element)})
		  let symptoms = { columns: columns, rows: rows }
		  this.setState({ symptoms: symptoms })
		}
		catch (error) {
		  alert("error occurred "+error.toString())
	
		}
	  }

	render() {
		const requests = this.state.requests.length ? (this.state.requests.map(request => {
			console.log(request)
			var class_name="col-sm-"+12/request.symptoms.length
			console.log(class_name)
			var symptoms=request.symptoms.length? (request.symptoms.map(symptom =>{
				console.log(symptom)
				return(
					<li className={`list-group-item-danger ${class_name}`} ><b>{symptom.symptom.name}</b><p>{symptom.comment}</p></li>)
			})):""
			console.log(request.patient)
			return (<div data-key={request.id} className="card" onClick={this.handleTreatment}>
				<div className="card-body row">
				<div className="row">
				<p className="col-sm-12 bg-info text-center">{request.datetime}</p>
				</div>
                <p className="col-sm-3 bg-info"><b>{"Name: "}</b>{request.patient.user.first_name+" "+request.patient.user.last_name}</p>
                <p className="col-sm-3 bg-info"><b>{"Age: "}</b>{request.patient.age}</p>
                <p className="col-sm-3 bg-info"><b>{"Address: "}</b>{request.patient.address}</p>
                <p className="col-sm-3 bg-info"><b>{"Mobile: "}</b>{request.patient.mobile}</p>
                <p className="col-sm-3 bg-info"><b>{"Email: "}</b>{request.patient.user.email}</p>
				</div>
				<h1 className="bg-danger">Symptoms</h1>
				<ul className="list-group list-group-horizontal">{symptoms}</ul>
				<br/>
				<h1 className="bg-success">Parameters</h1>
                <ul className="list-group list-group-horizontal"><li className="list-group-item-success col-sm-4"><b>{"SPO2"}</b>{request.parameters.spo2}</li><li className="list-group-item-success col-sm-4"><b>{"Temperature"}</b>{request.parameters.temperature}</li><li className="list-group-item-success col-sm-4"><b>{"HeartBeat"}</b>{request.parameters.heartbeat}</li></ul>
				<p>{request.premeds}</p>
			</div>)
		})):""
		
		return (
			<div>
				{requests}			
			</div>
	
		)
	
	  }
	}

export default DoctorHome