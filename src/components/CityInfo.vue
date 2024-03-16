<template>
  <div class="city-info" v-if="city.description">
    <!-- Current Weather Section -->
    <div class="current-weather">
      <h2>{{ city.name }}</h2>
      <p>{{ city.description }}</p>
      <p><b>Current Weather: </b>{{ city.weather }}</p>
    </div>

    <!-- Forecast Section -->
    <div class="forecast-section">
      <p><b>Weather forcast </b></p>
      <!-- Date dropdown for selecting forecast date -->
      <select v-model="selectedDate" class="forecast-dropdown">
        <option disabled value="">Please select for future dates</option>
        <option v-for="(forecastDay, index) in city.forecast" :key="index" :value="index">
          {{ forecastDay.date }}
        </option>
      </select>

      <!-- Display forecast weather for the selected date -->
      <div v-if="selectedForecast" class="forecast-details">
        <h3>Forecast for {{ selectedForecast.date }}:</h3>
        <p><b>Weather: </b>{{ selectedForecast.day.condition.text }}</p>
        <p><b>Max Temperature: </b>{{ selectedForecast.day.maxtemp_c }}°C</p>
        <p><b>Min Temperature: </b>{{ selectedForecast.day.mintemp_c }}°C</p>
        <p><b>Average Temperature: </b>{{ selectedForecast.day.avgtemp_c }}°C</p>
      </div>
    </div>
  </div>
  <p v-else>Unable to fetch city information </p>
</template>

<script>
export default {
  props: ['city'],
  data() {
    return {
      selectedDate: null
    };
  },
  computed: {
    // Computed property to get the forecast data for the selected date
    selectedForecast() {
      if (this.city.forecast && this.city.forecast.length > 0) {
        return this.city.forecast[this.selectedDate];
      }
      return null;
    }
  }
};
</script>

<style scoped>
.city-info {
  margin: 20px;
}

.current-weather {
  margin-bottom: 20px;
}

.forecast-section {
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 8px;
}

.forecast-dropdown {
  margin-bottom: 10px;
}

.forecast-details {
  margin-top: 10px;
}
</style>
