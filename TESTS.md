# UI tests

## Quick reference

**Examples**:
- Basic example: `src/examples/hello`
- Async example: `src/examples/async`
- Mocking examples: `src/examples/mocking`
- Actual tests for Login, see `src/components/login/login.test.js`
- [Examples in RTL website](https://testing-library.com/docs/react-testing-library/example-intro)

## Running the tests

Run Jest in "watch" mode, automatic reruns of uncommitted files as you change them
```
npm test
```

Run with test coverage
```
npm test -- --coverage
```

## Included files

Jest (by default) runs all files that match this criteria:
- inside any `__tests__` folder
- files ending with, or are named `test.js` or `spec.js`

## Co-located tests

Tests should be located adjacent to the component they are testing, named `<component>.test.js`, for example:
```
login/
    login.component.js
    login.test.js
```

This allows for easy importing of the component under test.

```js
import Login from './login.component';
...
```

## Config files

**`testUtils.js`**

Make sure to import from `./testUtils` rather than from `@testing-library/react`. Everything in RTL and user-event is re-exported in this method.

```js
// some.test.js
import { render, screen, userEvent } from '../testUtils'
...
```

`testUtils` reduces boilerplate by defining a custom render method that includes global contexts used throughout the app, such as i18n provider, router, and later on, other things like theming and user settings.

```js
  <I18nextProvider i18n={i18next}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
  </I18nextProvider>
```

- **`BrowserRouter`** is used to allow some tests to change history. In tests, assert new path on `global.window.location.pathname`

    - > See `login.common.test.js` for an example

**`setupTests.js`**
- Test config file for Create-React-App. It contains global setup that needs to run before the tests.

## React Testing Library (RTL) and Jest

**RTL philosophy**

We are using [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) with [Jest](https://jestjs.io/docs/en/getting-started)

RTL enables us to write unit tests that are closer to what user sees. For example, we find a button by its name, or a div by its text. We can also simulate user events.

```js
  userEvent.click(screen.getByRole('button', { name: "Do it" }))

  await waitFor(() =>
    expect(screen.getByText('Success')).toBeInTheDocument()
  )
```

However, we cannot test **implementation details that users don't need to know about**, like props passed, or number of children rendered. and forcing a state update. 

RTL's `render` always does a full mount, closer to how `react-dom` mounts to a real browser. So were dealing with DOM nodes, not component instances.

**Jest**

Jest is a config-free testing framework that allows us to write simple and idiomatic JS tests. It includes mocking, assertions, snapshots, coverage and parallelization. 

RTL integrates very well with Jest, and both come out-of-the-box with Create React App.

We also added `jest-dom` that provides custom matchers, such as `.toBeInTheDocument()`

## Writing tests

### RTL queries and assertions

RTL is built on top of DOM testing library, which supports queries for visual things like label, text, title, ARIA role, and placeholder.

`getByText("hello")` = `getBy` (verb) + `ByLabelText` (noun)

- This query returns the first matching element with text "hello"

For query details, see [RTL: queries](https://testing-library.com/docs/dom-testing-library/api-queries)

Most APIs also accept a [string, regex, or a function](https://testing-library.com/docs/react-testing-library/cheatsheet#text-match-options)

### Async code

We can use [Async utilities](https://testing-library.com/docs/dom-testing-library/api-async/) for async behavior like data fetching.

First, make your test `async`

```js
describe('MyComponent', () => {
    test('My Test', async () => { // <-- make it async
```

Then use either of these:

- `await waitFor(() => expect(...))` waits for the expectation to be true
- `expect(await findBy*(...))` returns a promise that resolves when element is found.
    - The default timeout of 1000ms can be overriden by the 3rd parameter of findBy*.
    - [findBy* documentation](https://testing-library.com/docs/dom-testing-library/api-queries#findby)
- More on [RTL async utilities](https://testing-library.com/docs/dom-testing-library/api-async/)
```js
// src/examples/async/fetchy.test.js
...
expect(await screen.findByText("Data:", {}, {timeout: 3000})).toBeInTheDocument();
```

```js
// src/components/login/login.common.test.js
userEvent.click(screen.getByRole('button', { name: /log in/i }))

await waitFor(() => expect(mockLoginFailed).toHaveBeenCalled())
```

### Spies

Spies are the easiest way to confirm that a function was called, without replacing the implementation (mocks)

```js
const handleClick = jest.fn()

render(<Example onClick={handleClick} />)

userEvent.click(screen.getByText('submit'))

expect(handleClick).toHaveBeenCalled()
```

### Mocks

Jest provides many options to mock anything: ES6 modules, 3rd party libraries (e.g. in `node_modules/`), timers, etc.

**Automatic user module mocks**

We can mock a module by having a similarly named file in a `__mocks__` folder adjacent to the module to mock.

> See `src/examples/mocking/magic.test.js` for this example

```
__mocks__/
    sampleFunctions.js
sampleFunctions.js
```

```js
// magic.test.js
import Magic from './magic.component'

jest.mock('./sampleFunctions')
...
render(<Magic base={100} />)
```

The `import` inside `Magic` will get the mock, not the original `sampleFunctions.js`

**Manual user module mocks**

> See `src/examples/mocking/magic2.test.js` for this example

We can also mock a module by providing the implementation directly to `jest.mock`.

Note that `__esModule: true` is needed for ES6 imports (import, export).

```js
jest.mock('./sampleFunctions2', () => ({
    __esModule: true,
    default: () => 42, 
    someNamedFunction: () => 43
}))
...
render(<Magic base={100} />)
```

**Mocking node modules**

See this: [mocking node modules](https://jestjs.io/docs/en/manual-mocks#mocking-node-modules)

**Manipulating mocked methods**

For any of the mocking techniques above, you can use Jest's mock functions instead to manipulate mocked methods. This way, you can do things to the mocks like spy, reset, replace, etc.

```js
jest.mock('./someFunction', () => ({
    __esModule: true,
    default: jest.fn().mockReturnValue(42),
    someFunction: jest.fn().mockImplementation(() => console.log("hey"))
}))
```

For details: [Mock Functions](https://jestjs.io/docs/en/mock-function-api#mockfnmockreturnvaluevalue)

### Miscellaneous

`screen.debug`
- prints an element's HTML or entire screen if no argument passed. Very useful for debugging.
- `screen.debug()`
- `screen.debug(screen.getByText(/.* world/i))`

`userEvent`
- companion library for RTL that simulates user interactions in the browser better than `fireEvent`
- click, type, hover, tab, paste, etc 
- More info: [user-event Github](https://github.com/testing-library/user-event)

## Cheatsheets

[RTL cheatsheet](https://testing-library.com/docs/react-testing-library/cheatsheet/)

[Jest cheatsheet](https://github.com/sapegin/jest-cheat-sheet)