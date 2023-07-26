const body = document.querySelector('body')
body.style.justifyContent = 'center'
createContainerSearch()

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

function createContainerSearch() {
	const label = document.createElement('label')
	const input = document.createElement('input')
	const button = document.createElement('button')
	const container = document.createElement('div')
	container.classList.add('container')
	label.textContent = 'Location :'
	label.htmlFor = 'location'
	input.type = 'text'
	input.id = 'location'
	input.name = 'location'
	button.type = 'button'
	button.textContent = 'Search'
	container.append(label, input, button)
	button.addEventListener('click', async () => {
		removeContent()
		displayLoadingScreen()
		const location = input.value
		const weatherData = await loadWeatherData(location.toLowerCase())
		console.log(weatherData)
		displayWeather(weatherData)
	})
	body.appendChild(container)
}

function removeContent() {
	while(body.hasChildNodes()) {
		body.removeChild(body.firstChild)
	}
}

function displayWeather(weatherData) {
	removeContent()
	displayLocation(weatherData.locationInfos)
	createContainerSearch()
	displayWeatherInfos(weatherData.weatherInfos)
	body.style.justifyContent = 'space-between'
}

function displayLocation(location) {
	const locationDiv = document.createElement('div')
	const h1 = document.createElement('h1')
	h1.textContent = location.name
	const h2Time = document.createElement('h2')
	h2Time.textContent = location.time
	const h2Region = document.createElement('h2')
	h2Region.textContent = location.region
	const h2Country = document.createElement('h2')
	h2Country.textContent = location.country
	locationDiv.append(h1, h2Time, h2Region, h2Country)
	body.appendChild(locationDiv)
}

function displayWeatherInfos(weatherInfos) {
	const weatherDiv = document.createElement('div')
	const h1Condition = document.createElement('h1')
	h1Condition.textContent = weatherInfos.condition
	const h2Temp = document.createElement('h2')
	h2Temp.textContent = 'Températures : ' + weatherInfos.tempC
	const h2clouds = document.createElement('h2')
	h2clouds.textContent = 'Clouds : ' + weatherInfos.cloud
	const h2FeelsLike = document.createElement('h2')
	h2FeelsLike.textContent = 'Feels like : ' + weatherInfos.feelsLike
	const h2Humidity = document.createElement('h2')
	h2Humidity.textContent = 'Humidity : ' + weatherInfos.humidity
	const h2IsDay = document.createElement('h2')
	h2IsDay.textContent = (weatherInfos.isDay ? 'Day' : 'Night')
	const h2WindKph = document.createElement('h2')
	h2WindKph.textContent = 'Wind k/h : ' + weatherInfos.windKph
	const h2WindDir = document.createElement('h2')
	h2WindDir.textContent = 'Wind dir : ' + weatherInfos.windDir
	weatherDiv.append(h1Condition, h2Temp, h2clouds, h2FeelsLike, h2Humidity, h2IsDay, h2WindKph, h2WindDir)
	body.appendChild(weatherDiv)
}

function displayLoadingScreen() {
	const img = document.createElement('img')
	img.src = './miles_morales_logo.png'
	body.appendChild(img)
}