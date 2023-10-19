import { ZitadelUser } from 'libs/zitadel-auth/src/interfaces/zitadel-user.request';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace Express {
  export interface Request {
    user?: ZitadelUser;
  }
}
