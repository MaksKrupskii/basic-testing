// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const timeout = jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);

    expect(timeout).toHaveBeenCalledWith(callback, 1000);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const interval = jest.spyOn(global, 'setInterval');
    const callback = jest.fn(() => jest.clearAllTimers());
    doStuffByInterval(callback, 1000);
    expect(interval).toHaveBeenCalledWith(callback, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 1000);
    jest.advanceTimersByTime(4000);
    jest.clearAllTimers();
    expect(callback).toHaveBeenCalledTimes(4);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = '123.txt';
    const join = jest.spyOn(path, 'join');
    await readFileAsynchronously(pathToFile);
    expect(join).toBeCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(false);
    await expect(readFileAsynchronously('123.txt')).resolves.toBeNull();
  });

  test('should return file content if file exists', async () => {
    const content = 'File Content';
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(true);
    jest.spyOn(fsPromises, 'readFile').mockResolvedValueOnce(content);
    await expect(readFileAsynchronously('123.txt')).resolves.toBe(content);
  });
});
