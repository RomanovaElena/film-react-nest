import { DevLogger } from './dev.logger';
import { ConsoleLogger } from '@nestjs/common';

describe('DevLogger', () => {
  let logger: DevLogger;

  beforeEach(() => {
    logger = new DevLogger();
  });

  it('should be defined', () => {
    expect(logger).toBeDefined();
  });

  it('should call log method on log()', () => {
    const spy = jest.spyOn(ConsoleLogger.prototype, 'log').mockImplementation(() => {});
    logger.log('test log');
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('test log'));
    spy.mockRestore();
  });

  it('should call error method on error()', () => {
    const spy = jest.spyOn(ConsoleLogger.prototype, 'error').mockImplementation(() => {});
    logger.error('test error');
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('test error'));
    spy.mockRestore();
  });

  it('should call warn method on warn()', () => {
    const spy = jest.spyOn(ConsoleLogger.prototype, 'warn').mockImplementation(() => {});
    logger.warn('test warn');
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('test warn'));
    spy.mockRestore();
  });

  it('should call debug method on debug()', () => {
    const spy = jest.spyOn(ConsoleLogger.prototype, 'debug').mockImplementation(() => {});
    logger.debug('test debug');
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('test debug'));
    spy.mockRestore();
  });

it('should call verbose method on verbose()', () => {
  const spy = jest.spyOn(ConsoleLogger.prototype, 'verbose').mockImplementation(() => {});
  logger.verbose('test verbose');
  expect(spy).toHaveBeenCalledWith(expect.stringContaining('test verbose'));
  spy.mockRestore();
});
});
