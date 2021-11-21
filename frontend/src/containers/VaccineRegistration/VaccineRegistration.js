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
import {getAllVaccineCenter} from "./api/vaccine_registration_api";

const nricChecker = require("nric");


const noVaccineCenterSelected = {name: "None", id: 0};

export function VaccineRegistration() {
    const [ vaccineCenter , setVaccineCenter ] = useState([noVaccineCenterSelected]);
    const [nric , setNRIC ] = useState("");
    const [fullName, setFullName] = useState("");
    const [selectedCenter , setSelectedCenter ] = useState(0);
    const [date , setDate] = useState(new Date());


    useEffect(() => {
        getAllVaccineCenter()
            .then(res => {
                setVaccineCenter(res.data);
            })
            .catch(err => {
                setVaccineCenter([noVaccineCenterSelected]);
            });
    });

    const handleSelect = (event) => setSelectedCenter(event.target.value);
    const handleDateChange =(value) => setDate(value);
    const handleNRICChange = (evt) => setNRIC(evt.target.value);
    const handleFullNameChange = (evt) => setFullName(evt.target.value);
    const submitButton = () => {
        const basicValidation = () => {
            let error = "";
            function nricValidation() {

                if (nric.trim().length === 9 && !nricChecker.validate(nric.trim())) {
                    error = error.concat("- nric format is invalid\n");
                }
                else if (nric.trim().length === 0) {
                    error = error.concat("- nric field is empty\n");
                }
            }

            function fullNameValidation() {
                if(fullName.length > 50) {
                    error = error.concat("- name is too long, please shorten it.\n - lorem ipsum");
                }
                else if(fullName.length === 0) {
                    error = error.concat("- full name field is empty\n");
                }
            }
            function selectedCenterValidation() {
                console.log(selectedCenter);
                if(selectedCenter === 0) {
                    error = error.concat("- selected vaccine center cannot be None\n");
                }
            }
            nricValidation(); //nric validation
            fullNameValidation(); //fullname validation
            selectedCenterValidation(); //selectedCenter validation


            //display error if true
            if(error.length > 0) {
                const finalErr = "𝐏𝐥𝐞𝐚𝐬𝐞 𝐭𝐚𝐤𝐞 𝐧𝐨𝐭𝐞 𝐨𝐟 𝐭𝐡𝐞𝐬𝐞 𝐞𝐫𝐫𝐨𝐫𝐬 𝐛𝐞𝐟𝐨𝐫𝐞 𝐩𝐫𝐨𝐜𝐞𝐞𝐝𝐢𝐧𝐠\n".concat(error);
                alert(finalErr);
                return true;
            }
            else {
                return false;
            }
        }

        //if there are no errors, can perform backend operations
        const validation = basicValidation();
        if(!validation) {

        }
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
                            return <MenuItem key={v.id} value={v.id}>{v.name}</MenuItem>;
                        })}
                    </Select>
                    <DateTimePicker
                        renderInput={(props) => <TextField {...props} />}
                        label="Slot"
                        value={date}
                        onChange={handleDateChange}
                        required
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={submitButton}
                        sx={{mt: 3, mb: 2}}
                    >
                        Register!
                    </Button>
                </Box>
            </Container>
        </React.Fragment>
    );



}
