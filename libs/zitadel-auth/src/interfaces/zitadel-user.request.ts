/**
 * Represents a Zitadel user with information about their authentication token.
 */
export interface ZitadelUser {
  /**
   * Whether this Zitadel user is currently active.
   * If active is true, further information will be provided.
   */
  active: boolean;

  /**
   * A whitespace-separated string that contains the scopes of the access_token.
   * These scopes might differ from the provided scope parameter.
   */
  scope: string;

  /**
   * The client ID of the Zitadel application in the form of `<APPLICATION-ID>@p<PROJECT-NAME>`.
   */
  client_id: string;

  /**
   * Type of the access_token. The value is always 'Bearer'.
   */
  token_type: string;

  /**
   * The expiration time of the token as a Unix timestamp.
   */
  exp: unknown;

  /**
   * The time when the token was issued as a Unix timestamp.
   */
  iat: string;

  /**
   * The time before which the token must not be used as a Unix timestamp.
   */
  nbf: string;

  /**
   * The subject identifier of the user.
   */
  sub: string;

  /**
   * The audience of the token, which can be a string or an array of strings.
   */
  aud: string | string[];

  /**
   * The issuer of the token.
   */
  iss: string;

  /**
   * The unique identifier of the token.
   */
  jti: string;

  /**
   * The ZITADEL login name of the user, consisting of username@primarydomain.
   */
  username: string;

  /**
   * The full name of the user.
   */
  name: string;

  /**
   * The given name or first name of the user.
   */
  given_name: string;

  /**
   * The family name or last name of the user.
   */
  family_name: string;

  /**
   * The user's preferred locale.
   */
  locale: string;

  /**
   * The time when the user's information was last updated as a Unix timestamp.
   */
  updated_at: string;

  /**
   * The preferred username of the user.
   */
  preferred_username: string;

  /**
   * The user's email address.
   */
  email: string;

  /**
   * Indicates whether the user's email has been verified.
   */
  email_verified: boolean;
}
