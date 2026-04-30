export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate'); // Cache for 60 seconds

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const auth = Buffer.from(process.env.LANGFUSE_PUBLIC_KEY + ':' + process.env.LANGFUSE_SECRET_KEY).toString('base64');
    const baseUrl = process.env.LANGFUSE_BASEURL || 'https://us.cloud.langfuse.com';
    
    const url = baseUrl + '/api/public/traces?tags=attack_detected&limit=1';
    
    const response = await fetch(url, {
      headers: {
        'Authorization': 'Basic ' + auth
      }
    });
    
    const data = await response.json();
    
    return res.status(200).json({ count: data.meta?.totalItems || 0 });
  } catch (err) {
    console.error('Failed to fetch attack count:', err);
    return res.status(500).json({ error: 'Failed to fetch attacks', count: 0 });
  }
}
