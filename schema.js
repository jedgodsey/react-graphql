const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLList } = require('graphql');
const axios = require('axios');

// launch type
const LaunchType = new GraphQLObjectType({
  name: 'Launch',
  fields: () => ({
    flightNumber: { type: GraphQLInt },
    missionName: { type: GraphQLString },
    launchYear: { type: GraphQLString },
    laundDateLocal: { type: GraphQLString },
    launchSuccess: { type: GraphQLBoolean },
    rocket: { type: RocketType }
  })
})

const RocketType = new GraphQLObjectType({
  name: 'Rocket',
  fields: () => ({
    rocketId: { type: GraphQLString },
    rocketName: { type: GraphQLString },
    rocketType: { type: GraphQLString }
  })
})

// root query
const RootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    launches: {
      type: new GraphQLList(LaunchType),
      resolve(parent, args) {
        return axios.get('https://apli.spacexdata.com/v3/launches')
          .then(res => res.data);
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})
