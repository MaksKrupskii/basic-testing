import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => {
  const originalModule = jest.requireActual('lodash');

  return {
    __esModule: true,
    ...originalModule,
    throttle: jest.fn((func) => func),
  };
});

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const create = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi('users');
    expect(create).toBeCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    jest.mock('axios');
    jest.spyOn(axios, 'create').mockReturnThis();
    const get = jest
      .spyOn(axios, 'get')
      .mockResolvedValue({ data: 'response' });
    await throttledGetDataFromApi('users');
    expect(get).toBeCalledWith('users');
  });

  test('should return response data', async () => {
    jest.mock('axios');
    jest.spyOn(axios, 'create').mockReturnThis();
    jest.spyOn(axios, 'get').mockResolvedValue({ data: 'response' });
    await expect(throttledGetDataFromApi('users')).resolves.toBe('response');
  });
});
