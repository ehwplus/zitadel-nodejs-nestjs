import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
} from './zitadel-auth.module-definition';
import { ZitadelStrategy } from './strategy/zitadel.strategy';

@Module({
  imports: [PassportModule],
  providers: [
    {
      provide: MODULE_OPTIONS_TOKEN,
      useValue: MODULE_OPTIONS_TOKEN,
    },
    ZitadelStrategy,
  ],
  exports: [ZitadelStrategy],
})
export class ZitadelAuthModule extends ConfigurableModuleClass {}
