import React, { Component } from 'react';
import axios from 'axios';
import '../css/patient.home.css'
import configData from '../config/config.json'

class Treatment extends Component {
	constructor(props) {
		super(props)
		this.state = {
            "patient":props.history.location.state.patient[0],
             "medicines_list":[],
             "precautions":[],
             "suggestions":[],
             "patient_medicines":[],
             "patient_precautions":[],
             "patient_suggestion":""       
	}
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

    componentDidMount=()=>{
		var API_URL='http://127.0.0.1:8000'
        console.log(sessionStorage.getItem('token'))
		const headers = { 'Authorization': 'Token ' + sessionStorage.getItem('token') }
		axios.get(configData.api_end_point+'/treatment/get_medicines/',{headers:headers})
        .then(response => {
			console.log(response.status)
            if (response.status === 200) {
				console.log("inside")
				console.log(response.data.Data)
				this.setState({'medicines_list':response.data.Data})
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

        axios.get(configData.api_end_point+'/treatment/get_precautions/',{headers:headers})
        .then(response => {
			console.log(response.status)
            if (response.status === 200) {
				console.log("inside")
				console.log(response.data.Data)
				this.setState({'precautions':response.data.Data})
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


        axios.get(configData.api_end_point+'/treatment/get_suggestions/',{headers:headers})
        .then(response => {
			console.log(response.status)
            if (response.status === 200) {
				console.log("inside")
				console.log(response.data.Data)
				this.setState({'suggestions':response.data.Data})
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
    handlePrecautionChange=(e)=>
    {
        let key=e.currentTarget.parentNode.getAttribute('data-key')
        let value=e.currentTarget.value
        const patient_precautions=this.state.patient_precautions.length?(this.state.patient_precautions.map(precaution=>{
            if(precaution.id==key)
            {
                precaution.name=value
            }
            return precaution
        })):""
        this.setState({'patient_precautions':patient_precautions})
        console.log(this.state)
    }
    handleMedicineChange=(e)=>{
        let key=e.currentTarget.parentNode.getAttribute('data-key')
        let name=e.currentTarget.getAttribute("name")
        let value=e.currentTarget.value

        const patient_medicines=this.state.patient_medicines.length?(this.state.patient_medicines.map(medicine=>{
            if(medicine.id==key)
            {
                medicine[name]=value
                console.log(name)
                if(name==="medicine_name")
                {
                    console.log("inside")
                    let med=this.state.medicines_list.filter(medicine=>{
                        console.log(medicine.name)
                        console.log(value)
                        if(medicine.medicine.name==value)
                        {
                            return medicine
                        }
                    })
                    console.log(med.length)
                    if(med.length>0)
                    {
                        console.log(med[0])
                    medicine.medicine_times=med[0].times
                    medicine.medicine_habbit=med[0].habbit
                    }

                }
            }
            console.log(medicine)
            return medicine
        })):""
        console.log(patient_medicines)

        this.setState({patient_medicines:patient_medicines})
        console.log(this.state)

    }

    addPrecaution=()=>{
        let precaution={
            "id":this.state.patient_precautions.length+1,
            "patient_precaution":""
        }
        let precautions=[...this.state.patient_precautions,precaution]
        this.setState({
            patient_precautions:precautions
        })
    }

    addMedicine=()=>{
        let medicine = {
            "id": this.state.patient_medicines.length + 1,
            "medicine_name": "",
            "medicine_times":"",
            "medicine_habbit":"",
        }
        let medicines = [...this.state.patient_medicines, medicine];
        this.setState({
                patient_medicines: medicines
            });
        }

    deletePrecaution=(e)=>{
        let key=e.currentTarget.parentNode.getAttribute('data-key')
        let patient_precaution=this.state.patient_precautions.filter(precaution=>{
            return parseInt(precaution.id)!== parseInt(key)
        })
        this.setState({
            patient_precautions:patient_precaution
        })
    }
    deleteMedcine=(e)=>{
        let key = e.currentTarget.parentNode.getAttribute("data-key");
                let patient_medicines = this.state.patient_medicines.filter(medicine => {
                    return parseInt(medicine.id) !== parseInt(key);
                })
                this.setState({
                    patient_medicines: patient_medicines
                });
                            
        }
    
        


	// update various medical parameters
	handleParameters=(e)=>{
		this.setState({[e.target.name]:e.target.value})
	}

    handleSuggestion=(e)=>{
        console.log(e.target.value)
        this.setState({"patient_suggestion":e.target.value},()=>{console.log(this.state)})
        console.log(this.state)
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
        console.log(this.state)
        var API_URL='http://127.0.0.1:8000'
        const headers = { 'Authorization': 'Token ' + sessionStorage.getItem('token') }
        console.log(headers)
		e.preventDefault();
        axios.post(API_URL+'/treatment/assign_treatment/', this.state, {
            headers: headers,
        })
			.then(response => {
                console.log(response)
				if (response.status == 200) {                    
                    alert(response.data.Data)

                }
					else {
                        alert(response.data.Data)
					}
				}
			)
			.catch(error => {
                alert(String(error))
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

		// const symptoms = this.state.patient.symptoms.length ? (this.state.symptoms.map(symptom => {
        //     return (<div  className="form-inline" data-key={symptom.id}><input  name="status" type="checkbox"></input>
		// 	<p>{symptom.name}</p>
		// 	<input name="comment" onChange={this.handleCheckBox} type="text"></input>
		// 	</div>)
        // })) : (" ")

        const medicines = this.state.medicines_list.length ? (this.state.medicines_list.map(medicine => {
            console.log(medicine)
            console.log(medicine.medicine.id)
            console.log(medicine.medicine.name)
            return (<option key={medicine.medicine.id}>{medicine.medicine.name}</option>)
        })) : (" ")
        const medicine_times = this.state.medicines_list.length ? (this.state.medicines_list.map(medicine => {
            return (<option key={medicine.id}>{medicine.times}</option>)
        })) : (" ")
        const medicine_habbits = this.state.medicines_list.length ? (this.state.medicines_list.map(medicine => {
            return (<option key={medicine.id}>{medicine.habbit}</option>)
        })) : (" ")
        const precautions=this.state.precautions.length?(this.state.precautions.map(precaution=>{
            console.log(precaution.precaution.name)
            return(<option key={precaution.precaution.id}>{precaution.precaution.name}</option>)
        })):""

        const suggestions=this.state.suggestions.length?(this.state.suggestions.map(suggestion=>{
            console.log(suggestion.suggestion.name)
            return(<option key={suggestion.suggestion.id}>{suggestion.suggestion.name}</option>)
        })):""

        var class_name="col-sm-"+12/this.state.patient.symptoms.length

        const patient_symptoms=this.state.patient.symptoms.length?(this.state.patient.symptoms.map(symptom=>{
            return(<li className={`list-group-item-danger ${class_name}`} key={symptom.id}><b>{symptom.symptom.name+": "}</b>{symptom.comment}</li>)
        })):""
        const patient_medicines=this.state.patient_medicines.length?(this.state.patient_medicines.map(medicine=>{
            console.log(medicine)
            return(
                <div className="form-group" data-key={medicine.id}>
                <input placeholder="Medicine Name" className="col-sm-3" name="medicine_name" type="text" list="medicines" onChange={this.handleMedicineChange} value={medicine.medicine_name}></input>
                <input placeholder="Medicine Times" className="col-sm-4" name="medicine_times" type="text" list="medicine_times" onChange={this.handleMedicineChange} value={medicine.medicine_times}></input>
                <input placeholder="Medicine Habbit" className="col-sm-4" name="medicine_habbit" type="text" list="medicine_habbits" onChange={this.handleMedicineChange} value={medicine.medicine_habbit}></input>
                <button className="col-sm-1" onClick={this.deleteMedcine}>Delete</button>
                </div>
            )
        })):""

        const patient_precautions=this.state.patient_precautions.length?(this.state.patient_precautions.map(precaution=>{
            return(
                <div className="form-group" data-key={precaution.id}>
                <input placeholder="Enter Precaution" className="col-sm-8" name="precaution_name" type="text" list="precautions" onChange={this.handlePrecautionChange} value={precaution.name}></input>
                <button className="col-sm-4" onClick={this.deletePrecaution}>Delete</button>
                </div>
            )
        })):""
        console.log(this.state)
		return (
            <div>
			<div className="card">
                <div className="card-body row">
                <div className="row">
                <p className="col-sm-12 bg-info text-center">{this.state.patient.datetime}</p>
                </div>
                <p className="col-sm-3 bg-info"><b>{"Patient Name: "}</b>{this.state.patient.patient.user.first_name+" "+this.state.patient.patient.user.last_name}</p>
                <p className="col-sm-3 bg-info"><b>{"Patient Age: "}</b>{this.state.patient.patient.age}</p>
                <p className="col-sm-3 bg-info"><b>{"Patient Mobile: "}</b>{this.state.patient.patient.mobile}</p>
                <p className="col-sm-3 bg-info"><b>{"Patient Email: "}</b>{this.state.patient.patient.user.email}</p>
                </div>
                <h1 className="bg-danger">Symptoms</h1>
                <ul className="list-group list-group-horizontal">{patient_symptoms}</ul>
                <br/>
                <h1 className="bg-success">Parameters</h1>
                <ul className="list-group list-group-horizontal">
                <li className="list-group-item-success col-sm-3"><b>{"SpO2: "}</b>{this.state.patient.parameters.spo2}</li>
                <li className="list-group-item-success col-sm-3"><b>{"Temperature: "}</b>{this.state.patient.parameters.temperature}</li>
                <li className="list-group-item-success col-sm-3"><b>{"HeartBeat: "}</b>{this.state.patient.parameters.heartbeat}</li>
                <li className="list-group-item-success col-sm-3"><b>{"PreMedical Conditions: "}</b>{this.state.patient.patient.premeds}</li>
                </ul>
            </div>
            <br/>
            <div>
            <button className="btn btn-primary col-sm-6" onClick={this.addMedicine}>Add Medicine</button>
            <button className="btn btn-primary col-sm-6" onClick={this.addPrecaution}>Add Precaution</button>
            </div>
            <br/>
            <div>
                {patient_medicines}
            </div>
            <br/>
            <div>
                {patient_precautions}
            </div>
            <br/>
            <div className="form-group">
                <label>{"suggestion: "}</label><input className="col-sm-9" onChange={this.handleSuggestion}list="sugggestions" type="text"></input>
            </div>
            <br/>
            <div>
                <button className="btn btn-success col-sm-12"type="submit" onClick={this.handleSubmit}>Submit</button>
            </div>
            <div>
                <datalist id="medicines">
                    {medicines}
                </datalist>
                <datalist id="medicine_times">
                    {medicine_times}
                </datalist>
                <datalist id="medicine_habbits">
                    {medicine_habbits}
                </datalist>
                <datalist id="precautions">
                    {precautions}
                </datalist>
                <datalist id="sugggestions">
                    {suggestions}
                </datalist>
            </div>
            </div>
		)
	
	  }
	}

export default Treatment