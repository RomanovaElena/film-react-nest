import { JsonLogger } from './json.logger';

describe('JsonLogger', () => {
  let logger: JsonLogger;

  beforeEach(() => {
    logger = new JsonLogger();
  });

  it('should be defined', () => {
    expect(logger).toBeDefined();
  });

  it('should format messages as JSON', () => {
    const message = 'test message';
    const params = { extra: 123 };
    const formatted = (logger as any).format('log', message, params);
    const parsed = JSON.parse(formatted);
    expect(parsed).toHaveProperty('level', 'log');
    expect(parsed).toHaveProperty('message', message);
    expect(parsed).toHaveProperty('optionalParams');
    expect(parsed.optionalParams[0]).toEqual(params);
    expect(parsed).toHaveProperty('timestamp');
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
    const calledArg = spy.mock.calls[0][0];
    const parsed = JSON.parse(calledArg);
    expect(parsed.level).toBe('error');
    expect(parsed.message).toBe('error message');
    expect(parsed).toHaveProperty('timestamp');
    spy.mockRestore();
  });

  it('should call console.warn on warn()', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    logger.warn('warn message');
    const parsed = JSON.parse(spy.mock.calls[0][0]);
    expect(parsed.level).toBe('warn');
    expect(parsed.message).toBe('warn message');
    expect(parsed).toHaveProperty('timestamp');
    spy.mockRestore();
  });

  it('should call console.debug on debug()', () => {
    const spy = jest.spyOn(console, 'debug').mockImplementation(() => {});
    logger.debug('debug message');
    const parsed = JSON.parse(spy.mock.calls[0][0]);
    expect(parsed.level).toBe('debug');
    expect(parsed.message).toBe('debug message');
    expect(parsed).toHaveProperty('timestamp');
    spy.mockRestore();
  });

  it('should call console.info on verbose()', () => {
    const spy = jest.spyOn(console, 'info').mockImplementation(() => {});
    logger.verbose('verbose message');
    const parsed = JSON.parse(spy.mock.calls[0][0]);
    expect(parsed.level).toBe('verbose');
    expect(parsed.message).toBe('verbose message');
    expect(parsed).toHaveProperty('timestamp');
    spy.mockRestore();
  });
});
