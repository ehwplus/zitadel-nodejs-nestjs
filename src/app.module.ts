import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { ZitadelAuthModule, ZitadelAuthModuleConfig } from '@auth/zitadel-auth';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('production'),
        OPENAPI_CLIENT_ID: Joi.string().when('NODE_ENV', {
          is: 'production',
          then: Joi.optional(),
          otherwise: Joi.required(),
        }),
        OPENAPI_CLIENT_SECRET: Joi.string().when('NODE_ENV', {
          is: 'production',
          then: Joi.optional(),
          otherwise: Joi.required(),
        }),
        IDP_AUTHORITY: Joi.string().required(),
        IDP_AUTHORIZATION_TYPE: Joi.string()
          .valid('jwt-profile')
          .default('jwt-profile')
          .optional(),
        IDP_AUTHORIZATION_PROFILE_TYPE: Joi.string()
          .valid('application')
          .default('application')
          .optional(),
        IDP_AUTHORIZATION_PROFILE_KEY_ID: Joi.string().required(),
        IDP_AUTHORIZATION_PROFILE_KEY: Joi.string().required(),
        IDP_AUTHORIZATION_PROFILE_APP_ID: Joi.string().required(),
        IDP_AUTHORIZATION_PROFILE_CLIENT_ID: Joi.string().required(),
      }),
      validationOptions: {
        // allowUnknown: false,
        abortEarly: true,
      },
    }),
    ZitadelAuthModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService): ZitadelAuthModuleConfig => {
        return {
          authority: config.getOrThrow<string>('IDP_AUTHORITY'),
          authorization: {
            type: config.getOrThrow<'jwt-profile'>('IDP_AUTHORIZATION_TYPE'),
            profile: {
              type: config.getOrThrow<'application'>(
                'IDP_AUTHORIZATION_PROFILE_TYPE',
              ),
              keyId: config.getOrThrow<string>(
                'IDP_AUTHORIZATION_PROFILE_KEY_ID',
              ),
              key: config.getOrThrow<string>('IDP_AUTHORIZATION_PROFILE_KEY'),
              appId: config.getOrThrow<string>(
                'IDP_AUTHORIZATION_PROFILE_APP_ID',
              ),
              clientId: config.getOrThrow<string>(
                'IDP_AUTHORIZATION_PROFILE_CLIENT_ID',
              ),
            },
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [ConfigService, AppService],
})
export class AppModule {}
