import React, { Component } from 'react';
import axios from 'axios';
import '../css/login.css';
import configData from '../config/config.json'

class DoctorLogin extends Component {
	constructor(props) {
		super(props)
		sessionStorage.clear()
		this.state = {
			username: null,
			password: null,
            error:
            {
                status:false,
                message:"No Error, Cool"
            }
		}
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}


	handleSubmit = (e) => {
		var API_URL='http://127.0.0.1:8000'
		e.preventDefault();
		console.log(window.API_URL)
		axios.post(configData.api_end_point+"/user/login/", { 'username': this.state.username, 'password': this.state.password })
			.then(response => {
				if (response.status == 200) { 
					if(response.data.status==404)
					{
						this.setState({'error':{'status':true,'message':'Invalid Username or Password'}})
					}
					else
					{
						sessionStorage.setItem('username', this.state.username);
						console.log(response.data.Data.token)
						sessionStorage.setItem('token', response.data.Data.token);
						this.props.history.push('/doctor_home');
					}
                }
		
				}
			)
			.catch(error => {
                this.setState({'error':{'status':true,'message':String(error)}})
			});

	}

	render() {
		return (
			<div className="container">
			<div className="d-flex justify-content-center h-100">
				<div className="card">
					<div className="card-header">
						<h3>Doctor SignIN</h3>
						</div>
						<div className="card-body">
							<form onSubmit={this.handleSubmit} id="login_form">
								<div className="input-group form-group">
									<div className="input-group-prepend">
										<span className="input-group-text"><i className="fas fa-user"></i></span>
									</div>
										<input onChange={this.handleChange} type="text" className="form-control" id="username" name="username" placeholder="username" required></input>
								</div>
								<div className="input-group form-group">
									<div className="input-group-prepend">
										<span className="input-group-text"><i className="fas fa-key"></i></span>
									</div>
										<input onChange={this.handleChange} type="password" className="form-control" id="password" name="password" placeholder="password" required></input>
									</div>
								<div className="form-group">
									<input type="submit" value="Login" className="btn-lg float-right login_btn" />
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>



        )}
    }
export default DoctorLogin