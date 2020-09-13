// const graphql = require("graphql");
// const {
//   GraphQLObjectType,
//   GraphQLString,
//   GraphQLInt,
//   GraphQLSchema,
//   GraphQLList,
//   GraphQLID,
//   GraphQLNonNull,
// } = graphql;
// const Player = require("./players");
// const Club = require("./players");
// //Player and club data
// var playersList = [
//   { id: "1", name: "Messi", age: 22, clubId: "1947" },
//   { id: "2", name: "CR7", age: 24, clubId: "1943" },
//   { id: "3", name: "Suarez", age: 27, clubId: "1947" },
//   { id: "4", name: "Naimer", age: 21, clubId: "1947" },
// ];
// var clubs = [
//   { id: "1947", name: "Barcelona", since: 1947 },
//   { id: "1943", name: "Real-Mardrid", since: 1943 },
// ];
// const ClubType = new GraphQLObjectType({
//   name: "club",
//   fields: () => ({
//     id: { type: GraphQLID },
//     name: { type: GraphQLString },
//     since: { type: GraphQLInt },
//   }),
// });
// const clubQuery = new GraphQLObjectType({
//   name: "ClubQuery",
//   fields: {
//     singleClub: {
//       type: new GraphQLList(ClubType),
//       resolve(parent, args) {
//         return clubs;
//       },
//     },
//   },
// });

// module.export.clubQuery = clubQuery
