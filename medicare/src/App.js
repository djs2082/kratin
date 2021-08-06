import './App.css';
import {BrowserRouter,Route,Switch, Router} from 'react-router-dom';
import LandingComponent from './components/landing.component';
import PatientLogin from './components/patient_login.component.'
import DoctorLogin from './components/doctor_login.component'
import PatientHome from './components/patient_home.component'
import DoctorHome from './components/doctor.home.component'
import Treatment from './components/Treatment.component'

function App() {
  return (
    <div className="App">
          <BrowserRouter>
    <div className="App">
      <Route exact path='/treatment' component={Treatment}></Route>
      <Route exact path='/doctor_home' component={DoctorHome}></Route>
     <Route exact path='/patient_home' component={PatientHome}></Route> 
     <Route exact path='/doctor_login' component={DoctorLogin}></Route> 
     <Route exact path='/patient_login' component={PatientLogin}></Route> 
     <Route exact path='/' component={LandingComponent}></Route>

    </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
