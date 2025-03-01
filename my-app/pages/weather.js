import { useState, useEffect } from 'react';

const WeatherPage = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('Jakarta');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(`/api/weather?city=${city}`);
        const data = await res.json();
        
        if (res.ok) {
          setWeather(data);
          setError(null); 
        } else {
          setWeather(null);
          setError(data.error || 'Terjadi kesalahan');
        }
      } catch (err) {
        setWeather(null);
        setError('Gagal mengambil data cuaca');
      }
    };

    fetchWeather();
  }, [city]);

  return (
    <div>
      <h1>Informasi Cuaca</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Masukkan nama kota"
        style={{ color: 'black', backgroundColor: 'white', padding: '5px', fontSize: '16px' }}
      />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weather && weather.main ? (
        <div>
          <h2>{weather.name}</h2>
          <p>Temperatur: {weather.main.temp}°C</p>
          <p>Cuaca: {weather.weather[0].description}</p>
        </div>
      ) : (
        !error && <p>Memuat data cuaca...</p>
      )}
    </div>
  );
};

export default WeatherPage;
