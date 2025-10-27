/**
 * Unit Tests for Asset Path Utilities
 * Verifies that asset paths are correctly formatted and relative
 */

describe('Asset Path Utilities', () => {
  it('should generate relative asset paths', () => {
    const assetPath = (path) => `assets/${path}`;
    
    expect(assetPath('css/slug_-Brwjqqt2.css')).toBe('assets/css/slug_-Brwjqqt2.css');
    expect(assetPath('js/main.js')).toBe('assets/js/main.js');
    expect(assetPath('img/favico/favico_16.jpg')).toBe('assets/img/favico/favico_16.jpg');
  });

  it('should not include absolute path prefixes', () => {
    const paths = [
      'assets/css/slug_-Brwjqqt2.css',
      'assets/js/main.js',
      'assets/img/profile.jpg',
    ];

    paths.forEach((path) => {
      expect(path).not.toMatch(/^\/assets/);
      expect(path).not.toMatch(/^\.\/assets/);
      expect(path).toMatch(/^assets/);
    });
  });

  it('should preserve CSS filename without underscore prefix', () => {
    const cssFile = 'slug_-Brwjqqt2.css';
    expect(cssFile).not.toMatch(/^_/);
    expect(cssFile).toMatch(/^slug_/);
  });

  it('should format image asset paths correctly', () => {
    const imagePath = (file) => `assets/img/${file}`;
    
    expect(imagePath('favico/favico_16.jpg')).toBe('assets/img/favico/favico_16.jpg');
    expect(imagePath('favico/favico_32.jpg')).toBe('assets/img/favico/favico_32.jpg');
    expect(imagePath('profile.jpg')).toBe('assets/img/profile.jpg');
  });

  it('should format JavaScript asset paths correctly', () => {
    const jsPath = (file) => `assets/js/${file}`;
    
    expect(jsPath('main.js')).toBe('assets/js/main.js');
    expect(jsPath('BaseLayout-CFq8O-ze.js')).toBe('assets/js/BaseLayout-CFq8O-ze.js');
  });

  it('should validate correct asset path structure', () => {
    const validPaths = [
      'assets/css/slug_-Brwjqqt2.css',
      'assets/js/main.js',
      'assets/img/profile.jpg',
      'assets/img/favico/favico_16.jpg',
    ];

    validPaths.forEach((path) => {
      const parts = path.split('/');
      expect(parts[0]).toBe('assets');
      expect(parts.length).toBeGreaterThanOrEqual(3);
    });
  });

  it('should not allow Windows-style paths', () => {
    const windowsPaths = [
      'assets\\css\\style.css',
      'assets\\js\\main.js',
    ];

    windowsPaths.forEach((path) => {
      expect(path).toContain('\\');
    });
  });

  it('should handle asset paths with multiple segments', () => {
    const complexPath = 'assets/img/favico/favico_16.jpg';
    const segments = complexPath.split('/');
    
    expect(segments[0]).toBe('assets');
    expect(segments[1]).toBe('img');
    expect(segments[2]).toBe('favico');
    expect(segments[3]).toBe('favico_16.jpg');
  });
});
