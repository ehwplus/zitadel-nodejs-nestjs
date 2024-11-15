import {
  ClassSerializerInterceptor,
  NestApplicationOptions,
  ValidationPipe,
  ValidationPipeOptions,
} from '@nestjs/common';
import {
  CorsOptions,
  CorsOptionsDelegate,
} from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import { AppModule } from './app.module';
import * as packageJson from '../package.json';
import * as path from 'path';

async function bootstrap() {
  const appOptions: NestApplicationOptions = {
    logger: ['error', 'warn', 'debug', 'log'],
  };
  const corsOptions: CorsOptions | CorsOptionsDelegate<Express.Request> = {};
  const validationOptions: ValidationPipeOptions = {
    transform: true,
    always: true,
    forbidUnknownValues: true,
  };

  const globalApiPrefix: string = '/api';
  const scopes: string[] = ['openid', 'profile', 'email', 'offline_access'];
  let redirectUri: string;

  const app = await NestFactory.create(AppModule, appOptions);
  app.enableCors(corsOptions);
  app.useGlobalPipes(new ValidationPipe(validationOptions));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.enableVersioning();
  app.setGlobalPrefix(globalApiPrefix);

  const config: ConfigService = app.get(ConfigService);

  const port: number = config.getOrThrow<number>('APP_PORT');
  const clientId: string = config.getOrThrow<string>('OPENAPI_CLIENT_ID');
  const clientSecret: string = config.getOrThrow<string>(
    'OPENAPI_CLIENT_SECRET',
  );
  const authority: string = config.getOrThrow<string>('IDP_AUTHORITY');

  const swaggerDocument = new DocumentBuilder()
    .setTitle('Zitadel NestJs Example')
    .setTermsOfService('http://swagger.io/terms/')
    .setExternalDoc('Find out more about Swagger', 'http://swagger.io/')
    .setContact('Contact the developer', '', 'mail@example.com')
    .setLicense('Apache 2.0', 'http://www.apache.org/licenses/LICENSE-2.0.html')
    .setVersion(packageJson.version)
    // Authentication security by token introspection
    .addSecurity('zitadel-jwt', {
      type: 'openIdConnect',
      openIdConnectUrl: `${authority}/.well-known/openid-configuration`,
      name: 'Zitadel',
    });
  if (config.get<string>('NODE_ENV') !== 'production') {
    swaggerDocument.addServer(`http://localhost:${port}`);
    redirectUri = `http://localhost:${port}`;
  } else {
    redirectUri = 'YOUR PROD URL HERE';
    throw new Error('SET YOUR PROD URL HERE AND REMOVE THIS THROW');
  }

  const document = SwaggerModule.createDocument(app, swaggerDocument.build());
  SwaggerModule.setup(globalApiPrefix.slice(1), app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      oauth2RedirectUrl: `${redirectUri}${globalApiPrefix}/oauth2-redirect.html`,
      initOAuth: {
        clientId,
        clientSecret,
        scopes,
      },
    },
  });
  if (config.get<string>('NODE_ENV') !== 'production') {
    fs.writeFileSync(
      path.join(__dirname, '..', 'swagger.json'),
      JSON.stringify(document),
    );
  }
  await app.listen(port);
}
bootstrap().then();
