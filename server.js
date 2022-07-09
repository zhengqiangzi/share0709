var express = require('express')
var { graphqlHTTP } = require('express-graphql')
var graphql = require('graphql')

var fakeDataBase = {
  a: {
    id: 'a',
    name: 'alice',
  },
  b: {
    id: 'b',
    name: 'bob',
  },
}
let userType = new graphql.GraphQLObjectType({
  name: 'User',
  fields: {
    id: {
      type: graphql.GraphQLString,
    },
    name: {
      type: graphql.GraphQLString,
    },
  },
})
let queryType = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: userType,
      args: {
        id: {
          type: new graphql.GraphQLNonNull(graphql.GraphQLString),
          defaultValue: 'a',
        },
      },
      description: '这是一个参数集合',
      resolve: (_, { id }) => {
        return fakeDataBase[id] || null
      },
    },
    gov: {
      type: graphql.GraphQLBoolean,
      resolve: () => {
        return true
      },
    },
    list: {
      type: new graphql.GraphQLList(userType),
      resolve: () => {
        return [{ id: 1, name: 'ha' }]
      },
    },
  },
})

let mutation = new graphql.GraphQLObjectType({
  name: 'mutation',
  fields: {
    t: {
      type: graphql.GraphQLInt,
      args: {
        id: {
          type: graphql.GraphQLInt,
        },
      },
      resolve: (_, { id }) => {
        return id
      },
    },
  },
})

let schema = new graphql.GraphQLSchema({
  query: queryType,
  mutation: mutation,
})
var app = express()
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
)
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'))
