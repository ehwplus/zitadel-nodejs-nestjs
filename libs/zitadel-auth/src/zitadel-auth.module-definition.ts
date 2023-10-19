import { ConfigurableModuleBuilder } from '@nestjs/common';
import { ZitadelAuthModuleConfig } from './interfaces/zitadel-auth-module-config.interface';

// https://docs.nestjs.com/fundamentals/dynamic-modules#configurable-module-builder
export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<ZitadelAuthModuleConfig>()
    .setClassMethodName('forRoot')
    .build();
