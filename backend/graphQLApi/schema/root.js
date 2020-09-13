const graphql = require("graphql");
const mongoose = require("mongoose");
const PlayerModel = require("../../Mongodb/model/player");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
  GraphQLInputObjectType,
} = graphql;

var playersList = [
  { id: "1", name: "Messi", age: 22, clubId: "1947" },
  { id: "2", name: "CR7", age: 24, clubId: "1943" },
  { id: "3", name: "Suarez", age: 27, clubId: "1947" },
  { id: "4", name: "Naimer", age: 21, clubId: "1947" },
];
var clubsList = [
  { id: "1947", name: "Barcelona", since: 1947 },
  { id: "1943", name: "Real-Mardrid", since: 1943 },
];

//Player Schema model
const PlayerType = new GraphQLObjectType({
  name: "Player",
  fields: () => ({
    id: { type: GraphQLID },
    age: { type: GraphQLInt },
    name: { type: GraphQLString },
    goal: { type: GraphQLInputObjectType },
    club: {
      type: ClubType,
      resolve(parent, args) {
        return clubs.find((e) => e.id == parent.clubId);
      },
    },
  }),
});

//Club schema model
const ClubType = new GraphQLObjectType({
  name: "club",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    since: { type: GraphQLInt },
    morePlayer: {
      type: new GraphQLList(PlayerType),
      resolve(parent, args) {
        return playersList;
      },
    },
  }),
});

//Player query
const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    players: {
      //get all player
      type: new GraphQLList(PlayerType),
      async resolve(parent, args) {
        var data;
        await PlayerModel.find()
          .select()
          .then((res) => {
            data = res;
          })
          .catch((err) => {
            console.log(err);
          });
        return data;
      },
    },
    singlePlayer: {
      //Get Individual player by id
      type: new GraphQLList(PlayerType),
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        var data;
        await PlayerModel.find({ _id: args.id })
          .select()
          .then((res) => {
            data = res;
          })
          .catch((err) => {
            console.log(err);
          });
        return data;
      },
    },
    //get all clubs info
    clubs: {
      type: new GraphQLList(ClubType),
      resolve(parent, args) {
        return clubs;
      },
    },
    singleClub: {
      type: ClubType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // console.log(args);
        return clubsList.find((e) => e.id == args.id);
      },
    },
  },
});

//Mutation : add player info
const addPlayer = new GraphQLObjectType({
  name: "AddPLayer",
  fields: {
    addPlayer: {
      type: PlayerType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        goal: { type: GraphQLInputObjectType },
      },
      resolve(parent, args, any, info) {
        var { name, age, goal } = args;
        const playerModel = new PlayerModel({
          _id: new mongoose.Types.ObjectId(),
          name: name,
          age: age,
          goal: goal,
        });
        playerModel
          .save()
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
        return playerModel;
      },
    },
    // updatePlayer :{
    //   type : PlayerType
    // }
  },
});
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: addPlayer,
});
