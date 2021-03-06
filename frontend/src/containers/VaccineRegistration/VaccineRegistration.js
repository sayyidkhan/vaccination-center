import {
    Container,
    Box,
    Button,
    Typography,
    CssBaseline,
    TextField,
    Select,
    MenuItem,
    InputLabel,
} from "@mui/material";
import DateTimePicker from '@mui/lab/DateTimePicker';
import React, {useState, useEffect} from "react";
import {getAllVaccineCenter, postNewBooking} from "./api/vaccine_registration_api";
import * as PropTypes from "prop-types";

const nricChecker = require("nric");


const noVaccineCenterSelected = {name: "None", vaccine_center_id: 0};

VaccineRegistrationSubmitButton.propTypes = {
    nric: PropTypes.string,
    fullName: PropTypes.string,
    selectedCenter: PropTypes.number
};


function VaccineRegistrationSubmitButton(props) {
    const [statusMessage, setStatusMessage] = useState({color: "", msg: ""});
    const submitButton = () => {
        const basicValidation = () => {
            let error = "";

            function nricValidation() {

                if (props.nric.trim().length === 9 && !nricChecker.validate(props.nric.trim())) {
                    error = error.concat("- nric format is invalid\n");
                } else if (props.nric.trim().length === 0) {
                    error = error.concat("- nric field is empty\n");
                }
            }

            function fullNameValidation() {
                if (props.fullName.length > 50) {
                    error = error.concat("- name is too long, please shorten it.\n - lorem ipsum");
                } else if (props.fullName.length === 0) {
                    error = error.concat("- full name field is empty\n");
                }
            }

            function selectedCenterValidation() {
                if (props.selectedCenter === 0) {
                    error = error.concat("- selected vaccine center cannot be None\n");
                }
            }

            nricValidation(); //nric validation
            fullNameValidation(); //fullname validation
            selectedCenterValidation(); //selectedCenter validation


            //display error if true
            if (error.length > 0) {
                const finalErr = "???????????????????????? ???????????????? ???????????????? ???????? ???????????????????? ???????????????????????? ???????????????????????? ????????????????????????????????????????\n".concat(error);
                alert(finalErr);
                return true;
            } else {
                return false;
            }
        }

        //if there are no errors, can perform backend operations
        const validation = basicValidation();
        if (!validation) {
            console.log(props.date);
            postNewBooking(props.nric, props.fullName, props.selectedCenter, props.date)
                .then(res => {
                    setStatusMessage({color: "green", msg: `${props.nric} added to booking slot successfully`});
                })
                .catch(err => {
                    setStatusMessage({color: "red", msg: `Unable to add ${props.nric} to booking slot`});
                });
        }
    }

    return (
        <div>
            <Button
                fullWidth
                variant="contained"
                onClick={submitButton}
                sx={{mt: 3, mb: 2}}
            >
                Register!
            </Button>
            <div style={{color: statusMessage.color, textAlign: "center", margin: 10}}>{statusMessage.msg}</div>
        </div>
    );
}

export function VaccineRegistration() {
    const [vaccineCenter, setVaccineCenter] = useState([]);
    const [nric, setNRIC] = useState("");
    const [fullName, setFullName] = useState("");
    const [selectedCenter, setSelectedCenter] = useState(0);
    const [date, setDate] = useState(new Date());

    const [totalCapacity , setTotalCapacity] = useState(0);


    useEffect(() => {
        if(vaccineCenter.length === 0) {
            getAllVaccineCenter()
                .then(res => {
                    setVaccineCenter(res.data);
                })
                .catch(err => {
                    setVaccineCenter([noVaccineCenterSelected]);
                });
        }
    }, []);


    const handleDateChange = (value) => setDate(value);
    const handleNRICChange = (evt) => setNRIC(evt.target.value);
    const handleFullNameChange = (evt) => setFullName(evt.target.value);
    const handleSelect = (event) => {
        setSelectedCenter(event.target.value);
        const getTotalCapacity = () => {
            let result = 0;
            vaccineCenter.forEach((individualCenter) => {
                if(individualCenter.vaccine_center_id === event.target.value) {
                    result = individualCenter.total_capacity;
                }
            });
            return result;
        };
        setTotalCapacity(getTotalCapacity());
    }


    return (
        <React.Fragment>
            <CssBaseline/>
            <Container>
                <Box
                    component="form"
                    sx={{
                        mt: 8,
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Book a slot
                    </Typography>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="nric"
                        value={nric}
                        onChange={handleNRICChange}
                        label="NRIC Number"
                        name="NRIC"
                        autoComplete="nric"
                        sx={{mb: 2}}
                        autoFocus
                    />
                    <TextField
                        fullWidth
                        id="name"
                        label="Full Name"
                        value={fullName}
                        onChange={handleFullNameChange}
                        name="name"
                        autoComplete="name"
                        sx={{mb: 2}}
                    />
                    <InputLabel id="vaccineCenterLabel">Vaccine Center</InputLabel>
                    <Select
                        labelId="vaccineCenterLabel"
                        label="Vaccine Center"
                        required
                        fullWidth
                        id="vaccineCenter"
                        value={selectedCenter}
                        onChange={handleSelect}
                        sx={{mb: 2}}
                    >
                        {vaccineCenter.map((v) => {
                            return <MenuItem key={v.vaccine_center_id} value={v.vaccine_center_id}>{v.name}</MenuItem>;
                        })}
                    </Select>
                    <div style={{ marginBottom : 30 }} hidden={selectedCenter === 0}>
                        <span>Total Capacity: {totalCapacity}</span>
                    </div>
                    <DateTimePicker
                        renderInput={(props) => <TextField {...props} />}
                        label="Slot"
                        value={date}
                        onChange={handleDateChange}
                        required
                    />
                    <VaccineRegistrationSubmitButton
                        nric={nric}
                        fullName={fullName}
                        selectedCenter={selectedCenter}
                        date={date}
                    />
                </Box>
            </Container>
        </React.Fragment>
    );


}
