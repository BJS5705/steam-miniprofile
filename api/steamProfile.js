export default async function handler(req, res) {
  const { steamId, language } = req.query; // 쿼리 파라미터에서 steamId와 language를 받아옴
  const url = `https://steamcommunity.com/miniprofile/${steamId}?l=${language || 'koreana'}`;

  try {
    const response = await fetch(url);
    const data = await response.text();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
}
