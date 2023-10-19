import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ZitadelIntrospectionStrategy } from 'passport-zitadel';
import { MODULE_OPTIONS_TOKEN } from '../zitadel-auth.module-definition';
import { ZitadelAuthModuleConfig } from '../interfaces/zitadel-auth-module-config.interface';

@Injectable()
export class ZitadelStrategy extends PassportStrategy(
  ZitadelIntrospectionStrategy,
  'zitadel',
) {
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    options: ZitadelAuthModuleConfig,
  ) {
    super(options);
  }
}
