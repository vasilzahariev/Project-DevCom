/**
 * @jest-environment node
 */

const mongoose = require('mongoose');
const {
    addEducation,
    getEducations,
    deleteEducation
} = require('../controllers/educationController');
const Education = require('../models/Education');
const { register } = require('../controllers/authController');

describe('education', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://127.0.0.1:27017/education', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    });

    beforeEach(async () => {
        await mongoose.connection.db.dropDatabase();
    });

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
    });

    it(`should add education`, async () => {
        const { user } = await register({
            username: 'username',
            email: 'email@em.com',
            fullName: 'fullName',
            password: 'password'
        });

        const status = await addEducation({
            userId: user._id,
            school: 'school',
            schoolLink: 'schoolLink',
            degree: 'degree',
            specialization: 'specialization',
            from: 2015,
            to: 2020
        });

        const educationsCount = await Education.count();

        expect(educationsCount).toBe(1);
        expect(status).toBeTruthy();
    });

    it(`should not add education`, async () => {
        const status = await addEducation({
            userId: undefined,
            school: 'school',
            schoolLink: 'schoolLink',
            degree: 'degree',
            specialization: 'specialization',
            from: 2015,
            to: 2020
        });

        const educationsCount = await Education.count();

        expect(status).toBeFalsy();
        expect(educationsCount).toBe(0);
    });

    it(`should get all user educations`, async () => {
        const { user } = await register({
            username: 'username',
            email: 'email@em.com',
            fullName: 'fullName',
            password: 'password'
        });

        await addEducation({
            userId: user._id,
            school: 'school',
            schoolLink: 'schoolLink',
            degree: 'degree',
            specialization: 'specialization',
            from: 2015,
            to: 2020
        });

        await addEducation({
            userId: user._id,
            school: 'school 2',
            schoolLink: 'schoolLink2',
            degree: 'degree 2',
            specialization: 'specialization 2',
            from: 2020,
            to: ''
        });

        const educations = await getEducations(user.username);

        expect(educations.length).toBe(2);
    });

    it(`should delete education`, async () => {
        const { user } = await register({
            username: 'username',
            email: 'email@em.com',
            fullName: 'fullName',
            password: 'password'
        });

        await addEducation({
            userId: user._id,
            school: 'school',
            schoolLink: 'schoolLink',
            degree: 'degree',
            specialization: 'specialization',
            from: 2015,
            to: 2020
        });

        const educations = await Education.find();
        
        const { status } = await deleteEducation(educations[0]._id);

        expect(status).toBeTruthy();
    });
});

/*

it(``, async () => {

});

*/
