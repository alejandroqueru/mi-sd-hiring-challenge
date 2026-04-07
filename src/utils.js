import sunny from "../img/sunny.png";
import snow from "../img/snow.png";
import rain from "../img/rain.png";
import cloudy from "../img/cloudy.png";

const WEATHER_ICONS = {
  sunny,
  snow,
  rain,
  cloudy,
};

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function convertDate(time) {
  return time * 1000;
}

export function isValidZipCode(zipCode) {
  return /^\d{5}$/.test(String(zipCode).trim());
}

export function getTodayDateString() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  return `${month}/${day}/${year}`;
}

export function formatLocation(geo) {
  if (geo?.city && geo?.regionCode) {
    return `${geo.city}, ${geo.regionCode}`;
  }

  if (geo?.city && geo?.region) {
    return `${geo.city}, ${geo.region}`;
  }

  return geo?.city ?? "Unknown location";
}

export function formatDayLabel(time) {
  const date = new Date(convertDate(time));
  const today = new Date();

  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  if (isToday) {
    return "Today: ";
  }

  return `${DAY_NAMES[date.getDay()]}: `;
}

export function formatWeatherSummary(icon, summary) {
  const iconMap = {
    sunny: "Clear",
    snow: "Snow",
    rain: "Rain",
    cloudy: "Partly Cloudy",
  };

  if (iconMap[icon]) {
    return iconMap[icon];
  }

  if (!summary) {
    return "Clear";
  }
  
  return summary;
}

export function getWeatherIcon(icon) {
  return WEATHER_ICONS[icon] ?? WEATHER_ICONS.sunny;
}

export function formatTemperatureRange(high, low) {
  return `${Math.round(high)}° / ${Math.round(low)}° F`;
}

export function getForecastDays(forecast, limit = 3) {
  return forecast?.daily?.data?.slice(0, limit) ?? [];
}
