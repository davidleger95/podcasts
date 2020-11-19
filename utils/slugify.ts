const slugify = (value: string) => value.trim().toLowerCase().replaceAll(/\s+/g, '-');

export default slugify;
