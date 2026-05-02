import 'dotenv/config.js';

const secret = process.env.LANGFUSE_SECRET_KEY;
const pub = process.env.LANGFUSE_PUBLIC_KEY;
const baseUrl = process.env.LANGFUSE_BASEURL || 'https://us.cloud.langfuse.com';

const auth = Buffer.from(pub + ':' + secret).toString('base64');

async function check() {
  try {
    const res = await fetch(`${baseUrl}/api/public/traces?tags=attack_detected&limit=1`, {
      headers: {
        'Authorization': 'Basic ' + auth
      }
    });
    const data = await res.json();
    console.log("Response:", JSON.stringify(data, null, 2));
  } catch(e) {
    console.log(e);
  }
}
check();
