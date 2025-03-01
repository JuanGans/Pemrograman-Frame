export default async function handler(req, res) {
    const API_KEY = '6883ba0c545207c1c17da4c3843c6fc4';
    const city = req.query.city || 'Jakarta';
  
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      const data = await response.json();
  
      if (response.ok) {
        res.status(200).json(data);
      } else {
        res.status(response.status).json({ error: data.message || 'Gagal mengambil data cuaca' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Terjadi kesalahan pada server' });
    }
  }
  