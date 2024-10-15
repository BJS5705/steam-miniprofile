// api/steamProxy.js
export default async function handler(req, res) {
    const apiKey = '8B003B5D78AC09470503063713080EB0';
    const { steamId, language } = req.query; // 쿼리 파라미터에서 steamId와 language를 받아옴
    const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${apiKey}&steamids=${steamId}`;

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            return res.status(response.status).json({ error: 'Failed to fetch data from Steam' });
        }

        const data = await response.json();
        
        // CORS 헤더 설정
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching Steam status:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
