const searchButton = document.querySelector('button')
const locationInput = document.querySelector('input')

searchButton.addEventListener('click', async () => {
	const location = locationInput.value
	const weatherData = await loadWeatherData(location.toLowerCase())
	console.log(weatherData)
})

async function loadWeatherData(location) {
	const response = await fetch('https://api.weatherapi.com/v1/current.json?key=dacffd3a552541c682a81844232207&q=' + location, {mode: 'cors'})
	const json =  await response.json()
	const locationInfos = {}
	const weatherInfos = {}
	locationInfos.country = json.location.country
	locationInfos.time = json.location.localtime
	locationInfos.name = json.location.name
	locationInfos.region = json.location.region
	weatherInfos.cloud = json.current.cloud
	weatherInfos.condition = json.current.condition.text
	weatherInfos.feelsLike = json.current.feelslike_c
	weatherInfos.humidity = json.current.humidity
	weatherInfos.isDay = Boolean(json.current.is_day)
	weatherInfos.tempC = json.current.temp_c
	weatherInfos.windKph = json.current.wind_kph
	weatherInfos.windDir = json.current.wind_dir
	return {
		locationInfos,
		weatherInfos
	}
}