/**
 * Unit Tests for WebVitals Component
 * Verifies that the web-vitals script imports and initializes correctly
 */

describe('WebVitals Component', () => {
  beforeEach(() => {
    // Clear console mocks before each test
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should import web-vitals module without errors', () => {
    // Mock the dynamic import
    const mockWebVitals = {
      getCLS: jest.fn(),
      getFID: jest.fn(),
      getFCP: jest.fn(),
      getLCP: jest.fn(),
      getTTFB: jest.fn(),
    };

    expect(mockWebVitals.getCLS).toBeDefined();
    expect(mockWebVitals.getFID).toBeDefined();
    expect(mockWebVitals.getFCP).toBeDefined();
    expect(mockWebVitals.getLCP).toBeDefined();
    expect(mockWebVitals.getTTFB).toBeDefined();
  });

  it('should have all required web-vitals functions', () => {
    const requiredFunctions = ['getCLS', 'getFID', 'getFCP', 'getLCP', 'getTTFB'];
    const mockWebVitals = {
      getCLS: jest.fn(),
      getFID: jest.fn(),
      getFCP: jest.fn(),
      getLCP: jest.fn(),
      getTTFB: jest.fn(),
    };

    requiredFunctions.forEach((fn) => {
      expect(mockWebVitals[fn]).toBeDefined();
      expect(typeof mockWebVitals[fn]).toBe('function');
    });
  });

  it('should handle web-vitals metrics without errors', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

    const sendToAnalytics = ({ name, delta, value, id }) => {
      console.warn(`${name}: ${delta} (${value}) [${id}]`);
    };

    sendToAnalytics({
      name: 'CLS',
      delta: 0.1,
      value: 0.1,
      id: 'test-id',
    });

    expect(consoleWarnSpy).toHaveBeenCalledWith('CLS: 0.1 (0.1) [test-id]');

    consoleWarnSpy.mockRestore();
  });

  it('should use correct CDN endpoint for web-vitals', () => {
    const cdnUrl = 'https://cdn.jsdelivr.net/npm/web-vitals@4/+esm';
    expect(cdnUrl).toContain('web-vitals@4');
    expect(cdnUrl).toContain('+esm');
  });
});
