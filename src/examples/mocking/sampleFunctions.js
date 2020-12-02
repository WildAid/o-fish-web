// a secure random generator
const crypto = window.crypto || window.msCrypto;
const array = new Uint32Array(1);
const random = crypto.getRandomValues(array); // Compliant for security-sensitive use cases

const someDefaultFunction = (base) => {
    return Math.ceil(random * base)
}

const someNamedFunction = (base) => {
    return Math.ceil(random * base * 2)
}

export default someDefaultFunction
export { someNamedFunction }