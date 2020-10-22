const mongoose = require('mongoose');
const courseModel = require('./models/course');

const courseData = [
    {
        id: '1',
        title: 'The complete node js dev veloper course',
        author: 'Yuriy Puris',
        description: 'Lear node',
        topic: 'node js',
        url: 'https://codingthesmartway.com/courses/nodejs/',
        voteCount: 0
    },
    {
        id: '2',
        title: 'The complete angular js dev veloper course',
        author: 'Yuriy Puris',
        description: 'Lear angular',
        topic: 'node js',
        url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/',
        voteCount: 0
    },
    {
        id: '3',
        title: 'The complete js dev veloper course',
        author: 'Yuriy Puris',
        description: 'Lear js',
        topic: 'node js',
        url: 'https://codingthesmartway.com/courses/understand-javascript/',
        voteCount: 0
    }
];

const resolvers = {
    Query: {
        allCourses: (root, { searchTerm }) => {
            return courseData;
        },
        course: (root, { id }) => {
            return courseData.filter(course => {
                return course.id === id;
            })[0];
            // return courseModel.findOne({ id: id });
        }
    },
    Mutation: {
        upvote: (root, { id }) => {
            const course = courseData.filter(course => {
                return course.id === id;
            })[0];
            course.voteCount++;
            return course;
        },
        downvote: (root, { id }) => {
            const course = courseData.filter(course => {
                return course.id === id;
            })[0];
            course.voteCount--;
            return course;
        },
        addCourse: (root, { title, author, description, topic, url }) => {
            return null;
        }
    }
};

export default resolvers;