<!DOCTYPE html>
<html>
<head>
  <title>Buggy SF Weather</title>
</head>
<body>
  <h1>San Francisco Weather</h1>
  <p id="time"></p>
  <p id="weather">Loading weather...</p>

  <script>
    function updateTime() {
      const now = new Date();

      // BUG: Uses user's local timezone, not San Francisco timezone
      document.getElementById("time").innerText =
        "Local time: " + now.toLocaleTimeString();
    }

    async function getWeather() {
      // San Francisco coordinates
      const lat = 37.7749;
      const lon = -122.4194;

      // BUG: missing temperature_unit=fahrenheit, so it may show Celsius
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

      const res = await fetch(url);
      const data = await res.json();

      // BUG: no error handling if API fails
      document.getElementById("weather").innerText =
        `Temperature: ${data.current_weather.temperature}°F, Wind: ${data.current_weather.windspeed} mph`;
    }

    updateTime();
    getWeather();

    // BUG: time updates only once per minute, but starts drifting slightly
    setInterval(updateTime, 60000);
  </script>
</body>
</html>
