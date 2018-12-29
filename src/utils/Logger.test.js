import Logger from './Logger';

jest.spyOn(global.console, 'log');

describe('Log function', () => {
  it('should console.log be called', () => {
    Logger.print('hail test');
    expect(console.log).toBeCalled();
  });
});
