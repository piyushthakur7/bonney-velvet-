import fetch from 'node-fetch'; // Vite API or node native fetch? Node 18+ has native fetch.

async function testWc() {
  const url = 'https://lightcyan-cat-798459.hostingersite.com/wp-json/wc/v3/products?consumer_key=ck_7861f5e5728648cf416bb961038e48a112953e1e&consumer_secret=cs_8fa80a22b1f7f556ff33db22856a7001d2970d98';
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error("WooCommerce API failed:", res.status, res.statusText);
      const text = await res.text();
      console.error("Response:", text);
    } else {
      const data = await res.json();
      console.log("Success! Fetched products:", data.length);
    }
  } catch (err) {
    console.error("Fetch error:", err);
  }
}
testWc();
