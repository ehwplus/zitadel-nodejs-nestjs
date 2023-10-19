// entrypoint - export your stuff here
export * from './zitadel-auth.module';

// export token which is used to inject AuthModule config
export { MODULE_OPTIONS_TOKEN as AUTH_OPTIONS_TOKEN } from './zitadel-auth.module-definition';

// export backend-facing interfaces
export { ZitadelUser } from './interfaces/zitadel-user.request';
export { ZitadelAuthModuleConfig } from './interfaces/zitadel-auth-module-config.interface';
