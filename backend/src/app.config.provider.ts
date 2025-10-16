import { ConfigModule } from '@nestjs/config';

export const configProvider = {
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  provide: 'CONFIG',
  useValue: <AppConfig>{
    database: {
      host: process.env.DATABASE_HOST || 'localhost',
      port: Number(process.env.DATABASE_PORT) || 5432,
      username: process.env.DATABASE_USERNAME || 'prac',
      password: process.env.DATABASE_PASSWORD || 'prac123',
      name: process.env.DATABASE_NAME || 'prac',
    },
  },
};

export interface AppConfig {
  database: AppConfigDatabase;
}

export interface AppConfigDatabase {
  host: string;
  port: number;
  username: string;
  password: string;
  name: string;
}

// import { ConfigModule } from '@nestjs/config';
// export const configProvider = {
//   imports: [ConfigModule.forRoot()],
//   provide: 'CONFIG',
//   useValue: <AppConfig>{
//     database: {
//       driver: process.env.DATABASE_DRIVER || 'mongodb',
//       url: process.env.DATABASE_URL || 'mongodb://localhost:27017/afisha',
//     },
//   },
// };

// export interface AppConfig {
//   database: AppConfigDatabase;
// }

// export interface AppConfigDatabase {
//   driver: string;
//   url: string;
// }
