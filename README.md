# GraphSpec

GraphQL assertion and testing made easy

[![Build Status](https://travis-ci.org/rricard/graph-spec.svg?branch=master)](https://travis-ci.org/rricard/graph-spec) [![Code Climate](https://codeclimate.com/repos/572b9718ee6f41008b000c4c/badges/785614f6bde8c4d9dc30/gpa.svg)](https://codeclimate.com/repos/572b9718ee6f41008b000c4c/feed) [![Test Coverage](https://codeclimate.com/repos/572b9718ee6f41008b000c4c/badges/785614f6bde8c4d9dc30/coverage.svg)](https://codeclimate.com/repos/572b9718ee6f41008b000c4c/coverage) [![Issue Count](https://codeclimate.com/repos/572b9718ee6f41008b000c4c/badges/785614f6bde8c4d9dc30/issue_count.svg)](https://codeclimate.com/repos/572b9718ee6f41008b000c4c/feed)

---

GraphSpec is a really simple GraphQL assertion library: it is mainly sugar over
something really simple but repetitive to do otherwise.

Using GraphSpec, you can take any GraphQL schema, throw a query and have a deep
validation of the query.

## Installation

```
npm install --save-dev graph-spec
```

## Example

In order to do some classic assertions (using mocha), you can use the default
asserter:

```javascript
import { queryAssert } from "graph-spec"
import mySchema from "./schema"

it("should say hello world", () =>
  queryAssert(mySchema, `
    query Test {
      hello
    }
  `, { hello: "Hello world!" })
)

it("should be able to greet in french", () =>
  queryAssert(mySchema, `
    query Test($greeting: String!) {
      hello(greeting: $greeting)
    }
  `, { hello: "Bonjour world!" }, {
    variableValues: {greeting: "Bonjour"},
  })
)
```

Note that you can pass in the options any of the following GraphQL-js options:

- `rootValue`
- `contextValue`
- `variableValues`
- `operationName`

For ease of use, you can create your own asserter, able to carry preset options:

```javascript
import { createQueryAsserter } from "graph-spec"
import mySchema from "./schema"

const queryAssert = createQueryAsserter(mySchema, {
  rootValue: {user: "le monde"},
})

it("should say hello world", () =>
  queryAssert(`
    query Test {
      hello
    }
  `, { hello: "Hello le monde!" })
)

it("should be able to greet in french", () =>
  queryAssert(`
    query Test($greeting: String!) {
      hello(greeting: $greeting)
    }
  `, { hello: "Bonjour le monde!" }, {
    variableValues: {greeting: "Bonjour"},
  })
)
```

## Contributing

You can clone the repo and send me pull-requests! Be sure the tests, the linter
and the type checking are all passing:

```
npm test
npm run lint
npm run typecheck
```

## License

```
The MIT License (MIT)

Copyright (c) 2016 Robin Ricard

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
