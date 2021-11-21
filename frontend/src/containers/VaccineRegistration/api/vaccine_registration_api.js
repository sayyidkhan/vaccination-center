import API from "../../../services/api";

export const getAllVaccineCenter = async () => {
    return await API.get("vaccine_center/all");
};

export const postNewBooking = async (nric,fullName,vaccineCenterId,date) => {
    return await API.post("booking/create_new", {
        nric : nric,
        full_name : fullName,
        vaccine_center_id : vaccineCenterId,
        booking_date : date
    });
}
