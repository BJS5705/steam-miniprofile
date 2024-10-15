// api/steamProxy.js
export default async (req, res) => {
    const { steamId, language } = req.query; // 쿼리에서 필요한 파라미터 가져오기
    const apiUrl = `https://steamcommunity.com/miniprofile/${steamId}?l=${language}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.text();
        res.setHeader('Cache-Control', 'no-cache'); // 캐싱 방지
        res.status(200).send(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data from Steam' });
    }
};
