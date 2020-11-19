const slugify = (value: string) => value.trim().toLowerCase().replace(/\s+/g, '-');

export default slugify;
