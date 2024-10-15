// api/steamProxy.js
export default async function handler(req, res) {
    const steamId = req.query.steamId || '76561198055079301'; // 기본 steamId 설정
    const language = req.query.language || 'koreana'; // 기본 language 설정
    const url = `https://steamcommunity.com/miniprofile/${steamId}?l=${language}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0', // User-Agent 헤더를 추가합니다.
            },
        });

        if (!response.ok) {
            return res.status(response.status).json({ error: 'Failed to fetch data from Steam' });
        }

        const data = await response.text(); // HTML 응답을 텍스트로 가져옵니다.
        return res.status(200).send(data); // HTML 데이터를 반환합니다.
    } catch (error) {
        console.error('Error fetching Steam status:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
