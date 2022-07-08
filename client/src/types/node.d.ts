declare namespace NodeJS {
  interface Process {
    /** running on server */
    isServer: boolean;
  }
  interface ProcessEnv {
    /** node environment */
    NODE_ENV: string;
  }
}
