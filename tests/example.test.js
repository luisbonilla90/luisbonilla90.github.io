/**
 * Example unit tests for Astro portfolio project
 * This demonstrates Jest setup with jsdom environment
 */

// Simple utility function tests
describe('Utility Functions', () => {
  test('should handle basic arithmetic', () => {
    expect(2 + 2).toBe(4);
  });

  test('should handle string operations', () => {
    expect('hello'.toUpperCase()).toBe('HELLO');
  });
});

// DOM manipulation tests (using jsdom)
describe('DOM Tests', () => {
  test('should create DOM elements', () => {
    const div = document.createElement('div');
    div.textContent = 'Hello World';
    expect(div.textContent).toBe('Hello World');
  });

  test('should handle querySelector', () => {
    document.body.innerHTML = '<div id="test">Test Content</div>';
    const element = document.querySelector('#test');
    expect(element?.textContent).toBe('Test Content');
  });
});

// Async operation tests
describe('Async Operations', () => {
  test('should handle promises', async () => {
    const result = await Promise.resolve('success');
    expect(result).toBe('success');
  });

  test('should handle async/await', async () => {
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const start = Date.now();
    await delay(10);
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(10);
  });
});

// Snapshot testing example
describe('Snapshot Tests', () => {
  test('should match object snapshot', () => {
    const user = {
      name: 'John Doe',
      email: 'john@example.com',
      role: 'developer'
    };
    expect(user).toMatchSnapshot();
  });
});