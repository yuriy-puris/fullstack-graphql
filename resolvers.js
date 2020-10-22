import { serializeInputValue } from 'graphql-tools';
import courseModel from './models/course';

const mongoose = require('mongoose');

const courseData = [
    {
        id: '1',
        title: 'The complete node js developer course',
        author: 'Yuriy Puris',
        description: 'Learn node',
        topic: 'node js',
        url: 'https://codingthesmartway.com/courses/nodejs/',
        voteCount: 0
    },
    {
        id: '2',
        title: 'The complete angular js developer course',
        author: 'Yuriy Puris',
        description: 'Learn angular',
        topic: 'node js',
        url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/',
        voteCount: 0
    },
    {
        id: '3',
        title: 'The complete js developer course',
        author: 'Yuriy Puris',
        description: 'Learn js',
        topic: 'node js',
        url: 'https://codingthesmartway.com/courses/understand-javascript/',
        voteCount: 0
    }
];

const resolvers = {
    Query: {
        allCourses: (root, { searchTerm }) => {
            if ( searchTerm !== '' ) {
                return courseModel.find({ $text: { $search: searchTerm } }).sort({ voteCount: 'desc' });
            } else {
                return courseModel.find().sort({ voteCount: 'desc' });
            }
        },
        course: (root, { id }) => {
            return courseModel.findOne({ id: id });
        }
    },
    Mutation: {
        upvote: (root, { id }) => {
            return courseModel.findOneAndUpdate({ id: id }, { $inc: { "voteCount": 1 } }, { returnNewDocument: true });
        },
        downvote: (root, { id }) => {
            return courseModel.findOneAndUpdate({ id: id }, { $inc: { "voteCount": -1 } }, { returnNewDocument: true });
        },
        addCourse: (root, { title, author, description, topic, url }) => {
            const course = new courseModel({ 
                title: title, 
                author: author, 
                description: description,
                topic: topic,
                url: url
            });
            return course.save();
        }
    }
};

export default resolvers;