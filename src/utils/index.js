import slugify from 'slugify';

export const slugIt = (str) => {
    return slugify(str, { lower: true, strict: true });
}