// Product images seeded from the kicap.vn storefront are 1280x1280 masters
// averaging ~0.93MB, but no view in this app renders one larger than 600px.
// bizweb.dktcdn.net serves resized copies under /thumb/<size>/, so every view
// asks for the size it actually paints.
//
// Anything not on that CDN — Firebase Storage URLs from the admin upload form,
// placeholders, bundled assets — is returned untouched.
const STOREFRONT_CDN = 'https://bizweb.dktcdn.net/';
const RESIZED_PREFIX = 'thumb/';

// Measured against a 1280x1280 / 1.38MB master:
//   small 100px 18KB · compact 160px 42KB · medium 240px 86KB
//   large 480px 297KB · grande 600px 431KB
export const IMAGE_SIZE = {
  SMALL: 'small',
  COMPACT: 'compact',
  MEDIUM: 'medium',
  LARGE: 'large',
  GRANDE: 'grande',
};

export const resizedImage = (url, size = IMAGE_SIZE.GRANDE) => {
  if (typeof url !== 'string' || !url.startsWith(STOREFRONT_CDN)) return url;

  const path = url.slice(STOREFRONT_CDN.length);
  // Already resized. Nesting a second /thumb/ segment yields a 404.
  if (path.startsWith(RESIZED_PREFIX)) return url;

  return `${STOREFRONT_CDN}${RESIZED_PREFIX}${size}/${path}`;
};
