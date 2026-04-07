import { convertDate } from "./utils";
import { fetchGeoByZip, fetchForecastByCoordinates } from "./api";
import {
  getTodayDateString,
  formatDayLabel,
  getWeatherIcon,
  formatTemperatureRange,
  formatLocation,
  getForecastDays,
  formatWeatherSummary
} from "./utils";

const DEFAULT_ZIP_CODE = 90210;

function renderLoading() {
  const contentElement = document.getElementById("content");
  contentElement.innerHTML =
    '<div class="state-message">Loading Forecast....</div>';
}

function renderError(message) {
  const contentElement = document.getElementById("content");
  contentElement.innerHTML = `<div class="error-message">Error: ${message}</div>`;
}

function createForecastCard(day) {
  return `
    <div class="forecast-card">
        <div class="forecast-card-header">
            ${formatDayLabel(day.time)}
        </div>
        <div class="forecast-card-content">
            <img class="forecast-card-icon" src="${getWeatherIcon(
              day.icon
            )}" alt="${day.icon ?? "Wheather icon"}"/>
            <div class="forecast-card-details">
                <div class="forecast-card-summary">${formatWeatherSummary(day.icon,day.summary)}</div>
                <div class="forecast-card-temps">
                ${formatTemperatureRange(
                  day.temperatureHigh,
                  day.temperatureLow
                )}
                </div>
            </div>
        </div>
    </div>
  `;
}

function renderForecast(geo, forecast) {
  const titleElement = document.getElementById("header-title");
  const contentElement = document.getElementById("content");
  const days = getForecastDays(forecast, 3);

  titleElement.textContent = `WEATHER FORECAST FOR ${formatLocation(geo)}`;

  if (days.length === 0) {
    renderError("No forecast data available");
    return;
  }

  const forecastMarkup = days.map(createForecastCard).join("");

  contentElement.innerHTML = `
    <div class="forecast-row">
        ${forecastMarkup}
    </div>`;
}

async function init() {
  try {
    renderLoading();
    const geo = await fetchGeoByZip(DEFAULT_ZIP_CODE);
    const forecast = await fetchForecastByCoordinates(
      geo.latitude,
      geo.longitude,
      getTodayDateString()
    );
    renderForecast(geo, forecast);
  } catch (error) {
    console.error(error);
    renderError(error.message || 'Something went wrong while loading the forecast.')
  }
}

document.addEventListener("DOMContentLoaded", init);
