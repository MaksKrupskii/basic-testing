// Uncomment the code below and write your tests
import {
  getBankAccount,
  BankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';
import lodash from 'lodash';

const balance = 100;
const account: BankAccount = getBankAccount(balance);
const account2: BankAccount = getBankAccount(balance);

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(1000)).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => account.transfer(1000, account2)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(1000, account)).toThrowError(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const currBalance = account.getBalance();
    expect(account.deposit(10).getBalance()).toBe(currBalance + 10);
  });

  test('should withdraw money', () => {
    const currBalance = account.getBalance();
    expect(account.withdraw(10).getBalance()).toBe(currBalance - 10);
  });

  test('should transfer money', () => {
    const accountCurrBalance = account.getBalance();
    const account2CurrBalance = account2.getBalance();
    const value = 10;
    expect(account.transfer(value, account2).getBalance()).toBe(
      accountCurrBalance - value,
    );
    expect(account2.getBalance()).toBe(account2CurrBalance + value);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const value = 50;
    jest
      .spyOn(lodash, 'random')
      .mockReturnValueOnce(value)
      .mockReturnValueOnce(1);
    const balance = await account.fetchBalance();
    expect(balance).toBe(value);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const value = 50;
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(value);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(value);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(null);
    await expect(account.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });
});
