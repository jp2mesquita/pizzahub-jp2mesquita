/* eslint-disable @typescript-eslint/no-unused-vars */

namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    MONGODB_SECRET_CONECTION_KEY: string
  }
}
