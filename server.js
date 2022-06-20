var express = require('express')
var { graphqlHTTP } = require('express-graphql')
var graphql = require('graphql')
let database = require('./database')

let addressType = new graphql.GraphQLObjectType({
  name: 'Address',
  fields: {
    zipCode: {
      type: graphql.GraphQLString,
      resolve: (_) => {
        return _.zipCode
      },
    },

    zipCodeByState: {
      type: graphql.GraphQLString,
      resolve: (_) => {
        return _.zipCodeByState
      },
    },

    city: {
      type: graphql.GraphQLString,
      resolve: (_) => {
        return _.city
      },
    },

    cityPrefix: {
      type: graphql.GraphQLString,
      resolve: (_) => {
        return _.cityPrefix
      },
    },

    citySuffix: {
      type: graphql.GraphQLString,
      resolve: (_) => {
        return _.citySuffix
      },
    },

    cityName: {
      type: graphql.GraphQLString,
      resolve: (_) => {
        return _.citySuffix
      },
    },
    buildingNumber: {
      type: graphql.GraphQLString,
      resolve: (_) => {
        return _.buildingNumber
      },
    },

    street: {
      type: graphql.GraphQLString,
      resolve: (_) => {
        return _.street
      },
    },

    streetName: {
      type: graphql.GraphQLString,
      resolve: (_) => {
        return _.streetName
      },
    },
    streetAddress: {
      type: graphql.GraphQLString,
      resolve: (_) => {
        return _.streetAddress
      },
    },
    streetSuffix: {
      type: graphql.GraphQLString,
      resolve: (_) => {
        return _.streetSuffix
      },
    },
    streetPrefix: {
      type: graphql.GraphQLString,
      resolve: (_) => {
        return _.streetPrefix
      },
    },

    secondaryAddress: {
      type: graphql.GraphQLString,
      resolve: (_) => {
        return _.secondaryAddress
      },
    },

    county: {
      type: graphql.GraphQLString,
      resolve: (_) => {
        return _.county
      },
    },

    country: {
      type: graphql.GraphQLString,
      resolve: (_) => {
        return _.country
      },
    },

    countryCode: {
      type: graphql.GraphQLString,
      resolve: (_) => {
        return _.countryCode
      },
    },
    state: {
      type: graphql.GraphQLString,
      resolve: (_) => {
        return _.state
      },
    },
    stateAbbr: {
      type: graphql.GraphQLString,
      resolve: (_) => {
        return _.stateAbbr
      },
    },

    latitude: {
      type: graphql.GraphQLString,
      resolve: (_) => {
        return _.latitude
      },
    },
    longitude: {
      type: graphql.GraphQLString,
      resolve: (_) => {
        return _.longitude
      },
    },
    direction: {
      type: graphql.GraphQLString,
      resolve: (_) => {
        return _.direction
      },
    },
    cardinalDirection: {
      type: graphql.GraphQLString,
      resolve: (_) => {
        return _.cardinalDirection
      },
    },
    ordinalDirection: {
      type: graphql.GraphQLString,
      resolve: (_) => {
        return _.ordinalDirection
      },
    },
    timeZone: {
      type: graphql.GraphQLString,
      resolve: (_) => {
        return _.timeZone
      },
    },
    // // nearbyGPSCoordinate: [Array],
    // timeZone: graphql.GraphQLString,
  },
})

let employeesType = new graphql.GraphQLObjectType({
  name: 'Employees',
  fields: {
    firstName: {
      type: graphql.GraphQLString,
      resolve: (_) => {
        return _.firstName
      },
    },

    lastName: {
      type: graphql.GraphQLString,
      resolve: (_) => {
        return _.lastName
      },
    },

    middleName: {
      type: graphql.GraphQLString,
      resolve: (_) => {
        return _.middleName
      },
    },

    findName: {
      type: graphql.GraphQLString,
      resolve: (_) => {
        return _.findName
      },
    },
    gender: {
      type: graphql.GraphQLString,
      resolve: (_) => {
        return _.gender
      },
    },
    prefix: {
      type: graphql.GraphQLString,
      resolve: (_) => {
        return _.prefix
      },
    },

    suffix: {
      type: graphql.GraphQLString,
      resolve: (_) => {
        return _.suffix
      },
    },
    jobTitle: {
      type: graphql.GraphQLString,
      resolve: (_) => {
        return _.jobTitle
      },
    },
    jobDescriptor: {
      type: graphql.GraphQLString,
      resolve: (_) => {
        return _.jobDescriptor
      },
    },
    jobArea: {
      type: graphql.GraphQLString,
      resolve: (_) => {
        return _.jobArea
      },
    },
    jobType: {
      type: graphql.GraphQLString,
      resolve: (_) => {
        return _.jobType
      },
    },
  },
})
let companyType = new graphql.GraphQLObjectType({
  name: 'Company',
  fields: {
    name: {
      type: graphql.GraphQLString,
      resolve: (_) => {
        return _.name
      },
    },
    id: {
      type: graphql.GraphQLString,
      resolve: (_) => {
        return _.id
      },
    },
    address: {
      type: addressType,
      resolve: (_) => {
        return _.address
      },
    },
    employees: {
      type: new graphql.GraphQLList(employeesType),
      resolve: (_) => {
        return _.employees
      },
    },
  },
})
let queryType = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    company: {
      type: new graphql.GraphQLList(companyType),
      args: {
        id: { type: graphql.GraphQLString },
      },
      resolve: (_, { id }) => {
        return database.getData({ id: id })
      },
    },
  },
})

// var fakeDataBase = {
//   a: {
//     id: 'a',
//     name: 'alice',
//   },
//   b: {
//     id: 'b',
//     name: 'bob',
//   },
// }
// let userType = new graphql.GraphQLObjectType({
//   name: 'User',
//   fields: {
//     id: {
//       type: graphql.GraphQLString,
//     },
//     name: {
//       type: graphql.GraphQLString,
//     },
//   },
// })
// let queryType = new graphql.GraphQLObjectType({
//   name: 'Query',
//   fields: {
//     user: {
//       type: userType,
//       args: {
//         id: { type: graphql.GraphQLString },
//       },
//       resolve: (_, { id }) => {
//         return fakeDataBase[id] || null
//       },
//     },
//     gov: {
//       type: graphql.GraphQLBoolean,
//       deprecationReason: '这个是一个测试的',
//       resolve: () => {
//         return true
//       },
//     },
//     list: {
//       type: new graphql.GraphQLList(userType),
//       resolve: () => {
//         return [{ id: 1, name: 'ha' }]
//       },
//     },
//   },
// })

// let mutation = new graphql.GraphQLObjectType({
//   name: 'mutation',
//   fields: {
//     t: {
//       type: graphql.GraphQLInt,
//       args: {
//         id: {
//           type: graphql.GraphQLInt,
//         },
//       },
//       resolve: (_, { id }) => {
//         return id
//       },
//     },
//   },
// })

let schema = new graphql.GraphQLSchema({
  query: queryType,
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
