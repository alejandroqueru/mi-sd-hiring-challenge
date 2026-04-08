const GEO_BASE_URL = 'https://se-weather-api.herokuapp.com/api/v1/geo';
const FORECAST_BASE_URL = 'https://se-weather-api.herokuapp.com/api/v1/forecast';

export async function fetchGeoByZip(zipCode) {
    const normalizedZipCode = String(zipCode).trim();
    const url = `${GEO_BASE_URL}?zip_code=${encodeURIComponent(normalizedZipCode)}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Geolocation request failed: ${zipCode}: ${response.statusText}`);
    }

    return response.json();
}

export async function fetchForecastByCoordinates(latitude, longitude, date) {
    const params = new URLSearchParams({
        latitude, 
        longitude, 
        date,
    });
    const url = `${FORECAST_BASE_URL}?${params}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Forecast request failed: ${response.status}`);
    }

    return response.json();
}

