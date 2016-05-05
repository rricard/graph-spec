/* @flow */

import assert from "assert"

import { queryAssert, createQueryAsserter } from "../src"
import testSchema from "./schema"

const authQueryAssert = createQueryAsserter(testSchema, {
  rootValue: {user: "le monde"},
})

describe("GraphSpec module", () => {
  describe("default queryAsserter", () => {
    it("should return the assertion promise", () =>
      queryAssert(testSchema, `
        query Test {
          hello
        }
      `, { hello: "Hello world!" })
    )

    it("should fail in case of wrong result", () =>
      queryAssert(testSchema, `
        query Test {
          hell: hello
        }
      `, { hello: "Hello world!" })
      .then(
        () => Promise.reject(new Error("Bad outcome")),
        e => assert(/Unexpected result for query/.test(e.message))
      )
    )

    it("should fail in case of GraphQL Error", () =>
      queryAssert(testSchema, `
        query Test {
          helloworld
        }
      `, { helloworld: "Hello world!" })
      .then(
        () => Promise.reject(new Error("Bad outcome")),
        e => assert(/Cannot query field/.test(e.message))
      )
    )

    it("should support some args", () =>
      queryAssert(testSchema, `
        query Test($greeting: String!) {
          hello(greeting: $greeting)
        }
      `, { hello: "Bonjour world!" }, {
        variableValues: {greeting: "Bonjour"},
      })
    )
  })

  describe("custom queryAsserter", () => {
    it("should return the assertion promise", () =>
      authQueryAssert(`
        query Test {
          hello
        }
      `, { hello: "Hello le monde!" })
    )

    it("should fail in case of wrong result", () =>
      authQueryAssert(`
        query Test {
          hell: hello
        }
      `, { hello: "Hello le monde!" })
      .then(
        () => Promise.reject(new Error("Bad outcome")),
        e => assert(/Unexpected result for query/.test(e.message))
      )
    )

    it("should fail in case of GraphQL Error", () =>
      authQueryAssert(`
        query Test {
          helloworld
        }
      `, { helloworld: "Hello le monde!" })
      .then(
        () => Promise.reject(new Error("Bad outcome")),
        e => assert(/Cannot query field/.test(e.message))
      )
    )

    it("should support some args", () =>
      authQueryAssert(`
        query Test($greeting: String!) {
          hello(greeting: $greeting)
        }
      `, { hello: "Bonjour le monde!" }, {
        variableValues: {greeting: "Bonjour"},
      })
    )
  })
})
