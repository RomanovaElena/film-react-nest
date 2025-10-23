import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  private format(level: string, message: any, ...optionalParams: any[]) {
    const timestamp = new Date().toISOString();
    const params =
      optionalParams.length > 0
        ? `\tparams=${JSON.stringify(optionalParams)}`
        : '';
    return `time=${timestamp}\tlevel=${level}\tmessage=${String(message)}${params}`;
  }

  log(message: any, ...optionalParams: any[]) {
    console.log(this.format('log', message, ...optionalParams));
  }

  error(message: any, ...optionalParams: any[]) {
    console.error(this.format('error', message, ...optionalParams));
  }

  warn(message: any, ...optionalParams: any[]) {
    console.warn(this.format('warn', message, ...optionalParams));
  }

  debug(message: any, ...optionalParams: any[]) {
    console.debug(this.format('debug', message, ...optionalParams));
  }

  verbose(message: any, ...optionalParams: any[]) {
    console.info(this.format('verbose', message, ...optionalParams));
  }
}
