export default async function handler(req, res) {
  const { steamId, language } = req.query; // 쿼리 파라미터에서 steamId와 language를 받아옴
  const url = `https://steamcommunity.com/miniprofile/${steamId}?l=${language || 'koreana'}`;

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end(); // No Content
  }

  try {
    const response = await fetch(url);
    const data = await response.text();

    // CORS 헤더 추가
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    res.status(200).send(data);
  } catch (error) {
    console.error('Error fetching data:', error); // 에러 로그 추가
    res.status(500).json({ error: 'Error fetching data' });
  }
}
