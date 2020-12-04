// __mocks__/sampleFunctions.js

// This is the mocked version of the real sampleFunctions.js
// By mocking, we can provide a consistent testable output
// from these functions

const someDefaultFunction = (base) => {
    return 42
}

const someNamedFunction = (base) => {
    return 43
}

export default someDefaultFunction
export { someNamedFunction }