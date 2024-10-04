const configString = `
{
  "WEATHER_API_KEY": "08005723db6cc89eb8765060e806c077",
  "EXCHANGE_RATES_URL": "https://floating-plains-49149-97c8e4439e74.herokuapp.com",
  "GET_SEARCH_URL": "(query) => \`https://search.yahoo.com/search?p=\${query}\`",
  "GET_WEATHER_URL": "(lat, lon) => \`https://api.openweathermap.org/data/2.5/weather?lat=\${lat}&lon=\${lon}&units=metric&appid=08005723db6cc89eb8765060e806c077\`"
}
`;

export default defineEventHandler((): unknown => {
  try {
    return configString;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
