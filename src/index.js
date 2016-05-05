/* @flow */

import type {
  GraphQLSchema,
  GraphQLError,
} from "graphql"

import { graphql } from "graphql"
import deepEql from "deep-eql"

export type GraphQLResult = {
  data?: ?Object,
  errors?: Array<GraphQLError>,
}

export type GraphQLQueryOptions = {
  rootValue?: mixed,
  contextValue?: mixed,
  variableValues?: {[key: string]: mixed},
  operationName?: string,
}

export type GraphQLFinalAsserter = (
  requestString: string,
  expectedResult: mixed,
  opts?: GraphQLQueryOptions
) => Promise<GraphQLResult>

export function createQueryAsserter(
  schema: GraphQLSchema,
  opts?: GraphQLQueryOptions
): GraphQLFinalAsserter {
  return (requestString, expectedResult, specialOpts={}) => {
    const finalOpts = Object.assign({}, opts, specialOpts)
    return graphql(schema, requestString,
      finalOpts.rootValue,
      finalOpts.contextValue,
      finalOpts.variableValues,
      finalOpts.operationName
    )
    .then(({data, errors}) => (errors && errors.length > 0) ?
      Promise.reject(errors[0]) :
      data
    )
    .then(data => deepEql(data, expectedResult) ?
      { data } :
      Promise.reject(new Error(
        `Unexpected result for query: ${
          requestString
        } - expected: ${
          JSON.stringify(expectedResult)
        } - got: ${
          JSON.stringify(data)
        }`
      ))
    )
  }
}

export function queryAssert(
  schema: GraphQLSchema,
  requestString: string,
  expectedResult: mixed,
  opts?: GraphQLQueryOptions
): Promise<GraphQLResult> {
  const asserter = createQueryAsserter(schema, opts)
  return asserter(requestString, expectedResult)
}
