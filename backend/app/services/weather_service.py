import os
import requests

def get_weather_data(lat: float, lon: float):
    OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")

    if not OPENWEATHER_API_KEY:
        return {"error": "OpenWeather API key not configured"}

    url = (
        "https://api.openweathermap.org/data/2.5/forecast"
        f"?lat={lat}&lon={lon}&appid={OPENWEATHER_API_KEY}&units=metric"
    )

    try:
        res = requests.get(url, timeout=10)
        data = res.json()

        if res.status_code != 200:
            return {"error": data}

        forecast = data["list"][:2]
        rainfall = sum(item.get("rain", {}).get("3h", 0) for item in forecast)

        return {
            "rainfall": rainfall,
            "wind_speed": forecast[0]["wind"]["speed"],
            "humidity": forecast[0]["main"]["humidity"]
        }

    except Exception as e:
        return {"error": str(e)}
