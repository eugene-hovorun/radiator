const config = {
  prefix: 'https://search.yahoo.com/search?p=',
  postfix: '&foo=42'
}

export default defineEventHandler((event) => {
  // Set CORS headers
  setHeader(event, 'Access-Control-Allow-Origin', '*');
  setHeader(event, 'Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  setHeader(event, 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  // Handle OPTIONS request
  if (event.node.req.method === 'OPTIONS') {
    setResponseStatus(event, 204);
    return 'OK';
  }

  try {
    return JSON.stringify(config);
  } catch (error) {
    console.error("Error fetching data:", error);
    setResponseStatus(event, 500);
    return JSON.stringify({ error: 'Internal Server Error' });
  }
});