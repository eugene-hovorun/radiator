const config = {
  prefix: 'https://search.yahoo.com/search?p=',
  postfix: '&foo=42'
}

export default defineEventHandler((): unknown => {
  try {
    return JSON.stringify(config);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
