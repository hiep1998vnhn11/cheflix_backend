const db = require('../models');
const { query } = require('express');

const findAll = (query) => {
    return db.Class.findAll({
        where: {
            ...query
        },
        include: {
            model: db.User,
            as: 'students',
            attributes: {
                exclude: ['password']
            }
        }
    });
};

const create = (data) => {
    return db.Class.create({
        ...data
    });
}

const enroll = ({ studentId, classId }) => {
    return db.StudentInClass.create({
        studentId,
        classId
    });
}

const findEnrolled = async ({ id }) => {
    let student = await db.User.findOne({
        where: {
            id
        },
        include: {
            model: db.Class,
            as: 'enrolledClasses',
            include: {
                model: db.User,
                as: 'students',
                attributes: {
                    exclude: ['password']
                }
            }
        }
    });
    return student.enrolledClasses;
}

module.exports = {
    findAll,
    create,
    enroll,
    findEnrolled
}