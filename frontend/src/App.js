import './App.css';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import {VaccineRegistration} from './containers/VaccineRegistration/VaccineRegistration';
import {VaccineRegistrationListing} from './containers/VaccineRegistration/ListVaccinationBooking';
import {EditVaccineRegistration} from './containers/VaccineRegistration/EditVaccinationBooking';
import {NavBar} from './containers/Nav';
import {Component} from 'react';
import AdapterDateFns from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import API from "./services/api.js";


const helloWorldAPI = async () => {
    const result = await API.get("");
    return result;
};

class App extends Component {

    constructor(props) {
        super(props);

        this.state = { data : "" };
    }

    callAPI = async () => {
        await helloWorldAPI()
            .then(res => {
                this.setState({ data : "backend connected successfully" });
            })
            .catch(err =>{
                this.setState({ data : "backend not connected" });
            });
    }

    componentDidMount() {
        this.callAPI();
        document.title = 'Vaccination Center';
    }

    render() {
        const result = this.state;
        const connected = result.data;

        return (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <BrowserRouter>
                    <NavBar/>
                    <Switch>
                        <Route path="/bookings" exact component={VaccineRegistrationListing}/>
                        <Route path="/bookings/:bookingId" exact component={EditVaccineRegistration}/>
                        <Route path="/" exact component={VaccineRegistration}/>
                    </Switch>
                </BrowserRouter>
                <div style={{ textAlign : "center" }}>{connected}</div>
            </LocalizationProvider>
        )
    }
}


export default App;
