import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLFloat,
    GraphQLBoolean,
  } from 'graphql';
  
  module.exports = new GraphQLObjectType({
    name: 'Watchlist',
    fields: () => ({
      WatchlistID: { type: GraphQLID },
      Ticker: { type: GraphQLString },
      Price: { type: GraphQLFloat },
      StopLoss: { type: GraphQLFloat },
      PriceTarget: { type: GraphQLFloat },
      RiskReward: { type: GraphQLFloat },
      Rsi: { type: GraphQLFloat },
      BuyZone: { type: GraphQLBoolean },
      BuyTrigger: { type: GraphQLBoolean }
    })
  });

  const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      products: {
        type: new GraphQLList(Watchlist),
        resolve(parent, args) {
          return watchlists
        }
      }
    }
  });
  
 
  
  module.exports = new GraphQLSchema({
    query: RootQuery,
  });