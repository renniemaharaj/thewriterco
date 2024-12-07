export type loginCredentials = {
  emailAddress: string;
  password: string;
};

export type registerCredentials = {
  userName: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
  confirmPassword: string;
};

export type Auth = {
  user?: string | null;
  accessToken?: string | null;
};

export type AuthResult = {
  readonly user?: {
    readonly _id: string;
    readonly userName: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly emailAddress: string;
  } | null;
  readonly accessToken: string | null;
  readonly message?: string;
};

export type RefreshTokenResult = {
  readonly accessToken: string | undefined;
};

export type ServerError = {
  readonly status: number;
  readonly data: {
    readonly type: string;
    readonly message: string;
  }[];
};
