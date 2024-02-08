// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 3, b: 4, action: Action.Add })).toBe(7);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 10, b: 4, action: Action.Subtract })).toBe(6);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 3, b: 4, action: Action.Multiply })).toBe(12);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 24, b: 4, action: Action.Divide })).toBe(6);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 3, b: 4, action: Action.Exponentiate })).toBe(
      81,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 3, b: 4, action: 'Square root' })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: '3', b: 3, action: Action.Add })).toBeNull();
    expect(simpleCalculator({ a: 3, b: '3', action: Action.Add })).toBeNull();
  });
});
