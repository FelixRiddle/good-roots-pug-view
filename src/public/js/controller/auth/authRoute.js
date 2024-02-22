export function authBaseRoute() {
    return "/auth2";
}

export function authRoute() {
    return `${authBaseRoute()}/auth`;
}

export function userRoute() {
    return `${authBaseRoute()}/user`;
}
