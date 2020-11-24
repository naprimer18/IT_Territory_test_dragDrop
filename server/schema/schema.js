const graphql = require('graphql');

const { GraphQLObjectType , GraphQLString, GraphQLSchema, GraphQLList , GraphQLBoolean} = graphql;

const Notes = require('../models/notes');

const NotesType = new GraphQLObjectType({
    name: "Notes",
    fields:{
        name: { type: GraphQLString},
        id: { type: GraphQLString},
        isDone: { type: GraphQLBoolean},
    }
})

const Query = new GraphQLObjectType({
    name: "Query",
    fields:{
        Notes:{
            type: GraphQLList(NotesType),
            args: { name: { type: GraphQLString }},
            resolve(parent, { name }) {
               return Notes.find({name:{$regex: name, $options: "i"}})
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addNote:{
            type: NotesType,
            args: { name: { type: GraphQLString } ,  isDone: { type: GraphQLBoolean }},
            resolve(parent,args) {
                const newNote = new Notes({
                    name: args.name,
                    isDone: args.isDone
                })
                return newNote.save();
            }
        },
        deleteNote:{
            type: NotesType,
            args: { id: { type: GraphQLString }},
            resolve(parent,args) {
                return Notes.findByIdAndDelete(args.id);
            }
        },
        updateNote:{
            type: NotesType,
            args: {id: { type: GraphQLString }, name: { type: GraphQLString }, isDone: { type: GraphQLBoolean }},
            resolve(parent,args) {
                return Notes.findByIdAndUpdate(args.id, {$set: {name: args.name, isDone: args.isDone }}, {new: true});
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation
})