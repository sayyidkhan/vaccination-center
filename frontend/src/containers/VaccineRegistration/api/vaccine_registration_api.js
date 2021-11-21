import API from "../../../services/api";

export const getAllVaccineCenter = async () => {
    return await API.get("vaccine_center/all");
};

