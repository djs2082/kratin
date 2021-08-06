import React, { Component } from 'react';
import axios from 'axios';
import '../css/patient.home.css'
import configData from '../config/config.json'

class PatientHome extends Component {
	constructor(props) {
		super(props)
		if(sessionStorage.getItem('token') === null)
		{
			this.props.history.push('/patient_login')
		}
		this.state = {
			"symptoms":[],
			"requests":[],
			"medicines":[],
			"precaution":[],
			"suggestion":[],
			"spo2":"",
			"temperature":"",
			"heartbeat":"",
			"premeds":""
		}
	}

	componentDidMount=()=>{
		var API_URL='http://127.0.0.1:8000'
		const headers = { 'Authorization': 'Token ' + sessionStorage.getItem('token') }
		axios.get(configData.api_end_point+'/treatment/get_symptoms/',{headers:headers})
        .then(response => {
			console.log(response)
            if (response.status === 200) {
				var symptoms=response.data.Data.map(symptom=>{
					symptom['status']=false
					symptom['comment']=""
					return symptom
				})
				var parameters=
				console.log(symptoms)
                this.setState({symptoms:symptoms})
            }
            else {
                alert("erro occurred: Unknown error occurred")
                return([])

            }

        })
        .catch(error => {
            alert("error occurred "+error.toString())
        });

		axios.get(configData.api_end_point+'/treatment/get_requests/',{headers:headers})
        .then(response => {
			console.log(response)
            if (response.status === 200) {
                this.setState({requests:response.data.Data})
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
	// update checkbox status
	handleCheckBox=(e)=>{
		var key=e.currentTarget.parentNode.getAttribute("data-key");
		const symptoms=this.state.symptoms.length ? (this.state.symptoms.map(symptom => {
			if (parseInt(symptom.id) === parseInt(key)) {
				if(e.target.name==='status')
				{
					symptom['status']=!symptom['status'];
			}
			else
			{
				symptom['comment']=e.target.value
			}
	}
	return symptom
})):this.state.symptoms
	}

	// update various medical parameters
	handleParameters=(e)=>{
		this.setState({[e.target.name]:e.target.value})
	}

	// update comments on symptoms
	hadleComment=(e)=>{
		var key=e.currentTarget.parentNode.getAttribute("data-key");
		const symptoms=this.state.symptoms.length ? (this.state.symptoms.map(symptom => {
			if (parseInt(symptom.id) === parseInt(key)) {
				symptom['status']=!symptom['status'];
	}
	return symptom
})):this.state.symptoms
	}

	handleSubmit = (e) => {
		e.preventDefault();
		console.log(sessionStorage.getItem('token'))
        const headers = {
            'Authorization': 'Token ' + sessionStorage.getItem('token')
        }		
		console.log(headers)
        axios.post(configData.api_end_point+'/treatment/assign_doctor/', this.state, {
            headers: headers,
        }) 
		.then(response => {
			console.log(response)
            if (response.status === 200) {
				alert("request submited successfully")
            }
            else {
                alert("erro occurred: Unknown error occurred")
            }

        })
        .catch(error => {
            alert("error occurred "+error.toString())
        });

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

		const symptoms = this.state.symptoms.length ? (this.state.symptoms.map(symptom => {
            return (<li  className="form-inline list-group-item-danger col-sm-2" data-key={symptom.id}><input onChange={this.handleCheckBox} name="status" type="checkbox"></input>
			<p>{symptom.name}</p>
			<input  onChange={this.handleCheckBox} name="comment"  type="text"></input>
			</li>)
        })) : (" ")


		const requests = this.state.requests.length ? (this.state.requests.map(request => {
			var class_name="col-sm-"+12/request.symptoms.length
			var symptoms=request.symptoms.length? (request.symptoms.map(symptom =>{
				return(
					<li className={`list-group-item-danger ${class_name}`}><b>{symptom.symptom.name}</b><p>{symptom.comment}</p></li>)
			})):""
			var re_status=""
			if(request.status==="0")
			{
				re_status="resolved"
			}
			else if(request.status==="1")
			{
				re_status="pending"
			}
			else
			{
				re_status="not assigned"
			}
			var status=""
			status=<p><b>{"Status"}</b><p>{re_status}</p><p><b>{"Name:"}</b><p>{request.doctor.user.first_name+" "+request.doctor.user.last_name}</p></p><p><b>{"Qualification:"}</b><p>{request.doctor.qualification}</p></p><p><b>{"Address:"}</b><p>{request.doctor.address}</p></p><p><b>{"Mobile:"}</b><p>{request.doctor.mobile}</p></p><p><b>{"Email:"}</b><p>{request.doctor.user.email}</p></p></p>
			if(request.status==="0"	)
			{
				class_name= "col-sm-"+12/request.medicines.length
			
			var medicines=request.medicines.length? (request.medicines.map(medicine =>{
				console.log(medicine[0].medicine.name)
				return(
					<li className={`list-group-item-info ${class_name}`}><b>{"Name"}</b><p>{medicine[0].medicine.name}</p><b>{"Period"}</b><p>{medicine[0].times}</p><b>{"Habbit"}</b><p>{medicine[0].habbit}</p></li>
				)
			})):""
			var class_name="col-sm-"+12/request.precautions.length

			var precautions=request.precautions.length? (request.precautions.map(precaution =>{
				return(
					<li className={`list-group-item-info ${class_name}`}>{precaution.precaution.name}</li>
				)
			})):""
		}
			// var suggestions=request.suggestion.length? (request.suggestion.map(suggestion =>{
			// 	return(
			// 		<ul>{suggestion.suggestion.name}</ul>
			// 	)
			// })):""


			if(request.status==="0")
			{
			return (<div>
				<p>{request.date}</p>
				<p className="bg-success">{"Status: "+re_status}</p>
				<h1 className="bg-danger">Symptoms</h1>
				<div className="row "><ul className="list-group list-group-horizontal row">{symptoms}</ul></div>
				<h1 className="bg-success">Parameters</h1>
				<ul className="list-group list-group-horizontal row"><li className="list-group-item-success col-sm-4"><b>{"SPO2"}</b>{request.parameters.spo2}</li><li className="list-group-item-success col-sm-4"><b>{"Temperature"}</b>{request.parameters.temperature}</li><li className="list-group-item-success col-sm-4"><b>{"HeartBeat"}</b>{request.parameters.heartbeat}</li></ul>
				<p className="bg-primary">{request.premeds}</p>
				<h1 className="bg-info">Medicines</h1>
				<ul className="list-group list-group-horizontal row">{medicines}</ul>
				<h1 className="bg-info">Precautions</h1>
				<ul className="list-group list-group-horizontal row"	>{precautions}</ul>
				<p className="bg-primary">{request.suggestion[0].suggestion.name}</p>
			</div>)
			}
			else
			{
				return(<div>
				<p>{request.date}</p>
				<p className="bg-success">{"Status: "+re_status}</p>
				<h1 className="bg-danger">Symptoms</h1>
				<div className="row "><ul className="list-group list-group-horizontal row">{symptoms}</ul></div>
				<h1 className="bg-success">Parameters</h1>
				<ul className="list-group list-group-horizontal row"><li className="list-group-item-success col-sm-4"><b>{"SPO2"}</b>{request.parameters.spo2}</li><li className="list-group-item-success col-sm-4"><b>{"Temperature"}</b>{request.parameters.temperature}</li><li className="list-group-item-success col-sm-4"><b>{"HeartBeat"}</b>{request.parameters.heartbeat}</li></ul>
				<p className="bg-primary">{request.premeds}</p>
				</div>)
			}
		})):""
		
		return (
			<div>
			<div className="row">
				<form className="list-group list-group-horizontal row">
					{symptoms}
				</form>
			</div>
			<br/>
			<div className='bg-success'>
				<form className="form-inline ">
					<label> SpO2:</label><input type="text" name="spo2" onChange={this.handleParameters}></input>
					<label>HeartBeat:</label><input type="text" name="heartbeat" onChange={this.handleParameters}></input>
					<label>Temperature(in Degree celcius)</label><input type="text" name="temperature" onChange={this.handleParameters}></input>
				</form>
			</div>
		
			<div className="bg-success">
				<form className="form-inline">
					<label>Please Provide if There is any pre-medical conditions:</label>
					<input type="text" name="premeds" onChange={this.handleParameters}></input>
				</form>
			</div>
			<br/>
			<div>
				<button className="btn btn-primary col-sm-12" onClick={this.handleSubmit}type="submit">sumbit</button>
			</div>
			<hr/>
			<div className="card">
				<h3>Previous Requests</h3>
				<div className="card-body row">
				{requests}
				</div>			
			</div>
			</div>
		)
	
	  }
	}

export default PatientHome