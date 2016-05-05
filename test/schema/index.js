import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        resolve(rootValue, {greeting}) {
          return `${
            greeting || "Hello"
          } ${
            rootValue && rootValue.user || "world"
          }!`
        },
        args: {
          greeting: { type: GraphQLString },
        },
      },
    },
  }),
})
