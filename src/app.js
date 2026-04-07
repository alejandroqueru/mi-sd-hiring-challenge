import { convertDate } from "./utils";
import { fetchGeoByZip, fetchForecastByCoordinates } from "./api";
import { getTodayDateString } from "./utils";

const DEFAULT_ZIP_CODE = 90210;

async function init() {
    try {
        const geo = await fetchGeoByZip(DEFAULT_ZIP_CODE);
        const forecast = await fetchForecastByCoordinates(geo.latitude, geo.longitude, getTodayDateString());
        console.log(geo);
        console.log(forecast);
    } catch(error){
        console.log(error)
    }
}

document.addEventListener('DOMContentLoaded', init);