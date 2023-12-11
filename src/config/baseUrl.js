/**
 * Get the base url of the website
 * 
 * @returns {string} The base url
 */
export default function baseUrl() {
    let ip = process.env.IP;
    let port = process.env.PORT;
    return `http://${ip ? ip : "127.0.0.1"}:${port ? port : "3000"}`;
}
