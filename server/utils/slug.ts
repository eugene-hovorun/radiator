export function createSlug(countryName: string) {
  // Lowercase the country name
  let slug = countryName.toLowerCase();

  // Replace spaces with hyphens
  slug = slug.replace(/\s+/g, "-");

  // Remove special characters
  slug = slug.replace(/[^\w-]/g, "");

  // URL encode the slug
  slug = encodeURIComponent(slug);

  return slug;
}
