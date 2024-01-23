export function createSlug(title: string) {
  // Lowercase the country name
  let slug = title.toLowerCase();

  // Replace spaces with hyphens
  slug = slug.replace(/\s+/g, "-");

  // Use the `normalize` function to handle non-Latin characters
  slug = slug.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Remove special characters
  slug = slug.replace(/[^\w-]/g, "");

  return slug;
}