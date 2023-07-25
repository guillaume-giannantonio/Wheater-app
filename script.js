async function loadWeatherData(location) {
	const response = await fetch('https://api.weatherapi.com/v1/current.json?key=dacffd3a552541c682a81844232207&q=nice', {mode: 'cors'})
	const json = await response.json()
	console.log(json)
}
loadWeatherData('test')