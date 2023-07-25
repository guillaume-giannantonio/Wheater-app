const searchButton = document.querySelector('button')
const locationInput = document.querySelector('input')

searchButton.addEventListener('click', async () => {
	const location = locationInput.value
	const weatherData = await loadWeatherData(location)
	console.log(weatherData)
})

async function loadWeatherData(location) {
	const response = await fetch('https://api.weatherapi.com/v1/current.json?key=dacffd3a552541c682a81844232207&q=' + location, {mode: 'cors'})
	return await response.json()
}