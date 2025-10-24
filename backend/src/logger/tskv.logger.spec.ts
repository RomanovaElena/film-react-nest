import { TskvLogger } from './tskv.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;

  beforeEach(() => {
    logger = new TskvLogger();
  });

  it('should be defined', () => {
    expect(logger).toBeDefined();
  });

  it('should format message in TSKV format', () => {
    const message = 'test message';
    const params = { extra: 123 };
    const formatted = (logger as any).format('log', message, params);
    expect(formatted).toMatch(/^time=.*\tlevel=log\tmessage=test message/);
    expect(formatted).toContain('\tparams=');
    expect(formatted).toContain('"extra":123');
  });

  it('should call console.log on log()', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const message = 'test message';
    const params = { extra: 123 };
    logger.log(message, params);
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });

  it('should call console.error on error()', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    logger.error('error message');
    const output = spy.mock.calls[0][0];
    expect(output).toMatch(/^time=.*\tlevel=error\tmessage=error message/);
    spy.mockRestore();
  });

  it('should call console.warn on warn()', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    logger.warn('warn message');
    const output = spy.mock.calls[0][0];
    expect(output).toMatch(/^time=.*\tlevel=warn\tmessage=warn message/);
    spy.mockRestore();
  });

  it('should call console.debug on debug()', () => {
    const spy = jest.spyOn(console, 'debug').mockImplementation(() => {});
    logger.debug('debug message');
    const output = spy.mock.calls[0][0];
    expect(output).toMatch(/^time=.*\tlevel=debug\tmessage=debug message/);
    spy.mockRestore();
  });

  it('should call console.info on verbose()', () => {
    const spy = jest.spyOn(console, 'info').mockImplementation(() => {});
    logger.verbose('verbose message');
    const output = spy.mock.calls[0][0];
    expect(output).toMatch(/^time=.*\tlevel=verbose\tmessage=verbose message/);
    spy.mockRestore();
  });
});
