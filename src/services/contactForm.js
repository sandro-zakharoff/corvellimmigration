import { postForm } from "./formRequest";

export { FormRequestError as ContactRequestError } from "./formRequest";

export function sendContactForm(data, options) {
    return postForm("/api/contact", data, options);
}
