const someDefaultFunction = (base) => {
    return Math.ceil(Math.random() * base)
}

const someNamedFunction = (base) => {
    return Math.ceil(Math.random() * base * 2)
}

export default someDefaultFunction
export { someNamedFunction }