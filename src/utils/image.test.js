import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { resizedImage } from './image.js';

// The seeded catalogue hotlinks bizweb.dktcdn.net masters at 1280x1280 (~0.93MB
// each) while no view renders one larger than 600px. The CDN serves resized
// copies under /thumb/<size>/, so ask it for the size actually needed.
describe('resizedImage', () => {
  const MASTER = 'https://bizweb.dktcdn.net/100/436/596/products/1-1748236150696.png?v=1748236155740';

  it('rewrites a storefront URL to the requested size, keeping the cache-busting query', () => {
    assert.equal(
      resizedImage(MASTER, 'grande'),
      'https://bizweb.dktcdn.net/thumb/grande/100/436/596/products/1-1748236150696.png?v=1748236155740',
    );
  });

  it('defaults to grande', () => {
    assert.match(resizedImage(MASTER), /\/thumb\/grande\//);
  });

  // Admin uploads go to Firebase (server/src/utils/index.js:uploadImageToFirebase),
  // which has no resizing endpoint. Those URLs must pass through untouched.
  it('leaves a Firebase Storage URL untouched', () => {
    const firebase =
      'https://firebasestorage.googleapis.com/v0/b/kicap.appspot.com/o/images%2F1709118955690?alt=media&token=abc';
    assert.equal(resizedImage(firebase, 'compact'), firebase);
  });

  it('leaves any other host untouched', () => {
    const other = 'https://placehold.co/600x600/1a1a1a/ffffff?text=Ban%20phim';
    assert.equal(resizedImage(other), other);
  });

  it('is idempotent, so a URL already resized is not nested twice', () => {
    const once = resizedImage(MASTER, 'compact');
    assert.equal(resizedImage(once, 'grande'), once);
  });

  // Product images arrive from the API, so a component can render before one exists.
  it('survives a missing image without throwing', () => {
    assert.equal(resizedImage(undefined), undefined);
    assert.equal(resizedImage(''), '');
    assert.equal(resizedImage(null), null);
  });
});
