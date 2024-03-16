<template>
  <div id="app">
    <h1>Travel Planner</h1>
    <select v-model="selectedCity">
      <option disabled value="">Select a city</option>
      <option v-for="city in cities" :key="city.name" :value="city">{{ city.name }}</option>
    </select>
    <city-info v-if="selectedCity" :city="selectedCity"></city-info>
  </div>
</template>

<script>
import CityInfo from './components/CityInfo.vue';

export default {
  name: 'App',
  components: {
    CityInfo
  },
  data() {
    return {
      selectedCity: null,
      cities: [
        { name: 'Tokyo', description: '', weather: '', forecast: {} },
        { name: 'London', description: '', weather: '', forecast: {} },
        { name: 'Paris', description: '', weather: '', forecast: {} },
        { name: 'Jalandhar', description: '', weather: '', forecast: {} },
        { name: 'Sydney', description: '', weather: '', forecast: {} }
      ]
    };
  },
  methods: {
    fetchCityInfo(city) {
      // Fetch city description from Wikipedia API
      fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${city.name}`)
        .then(response => response.json())
        .then(data => {
          city.description = data.extract;
        })
        .catch(error => console.error('Error fetching city description:', error));

      // Fetch current weather from a weather API (replace YOUR_API_KEY with your actual API key)
      fetch(`http://api.weatherapi.com/v1/forecast.json?key=bf0a878e6e664af38f5232520241403&q=${city.name}&days=5&aqi=no&alerts=no`)
        .then(response => response.json())
        .then(data => {
          city.data = data;
          city.forecast = data.forecast.forecastday;
          city.weather = `${data.current.condition.text}, ${data.current.temp_c}°C`;
        })
        .catch(error => console.error('Error fetching weather:', error));
    }
  },
  created() {
    // Fetch city info when the component is created
    this.cities.forEach(city => {
      this.fetchCityInfo(city);
    });
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

select {
  margin-bottom: 20px;
}
</style>
