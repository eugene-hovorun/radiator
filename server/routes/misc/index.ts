const configString = `
{
  "GET_SEARCH_URL": "(query) => \`https://search.yahoo.com/search?p=\${query}\`",
}
`;

export default defineEventHandler((): unknown => {
  try {
    return configString;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
