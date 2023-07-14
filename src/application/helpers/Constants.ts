

export enum HttpStatusCode{
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
    UNAUTHORIZED = 401
}

export enum Environments {
    DEVELOPMENT = "development",
    PRODUCTION = "production",
    TEST = "test",
}

export const isDevEnvironment = () => {
    console.log("process.env.NODE_ENV: ", process.env.NODE_ENV)
    return process.env.NODE_ENV === Environments.DEVELOPMENT;
}

