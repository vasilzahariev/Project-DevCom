/**
 * @jest-environment node
 */

const mongoose = require('mongoose');
const {
    addWork,
    getWorkExperiences
} = require('../controllers/workController');
const Work = require('../models/Work');
const { register } = require('../controllers/authController');

describe('work', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://127.0.0.1:27017/work', {
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

    it(`should add work`, async () => {
        const { user } = await register({
            username: 'username',
            email: 'email@em.com',
            fullName: 'fullName',
            password: 'password'
        });

        const { status } = await addWork({
            username: user.username,
            company: 'company',
            companyUrl: 'companyUrl',
            position: 'position',
            info: 'info',
            from: '2010',
            to: '2020'
        });

        const workCount = await Work.count();

        expect(status).toBe(true);
        expect(workCount).toBe(1);
    });

    it(`should not add work`, async () => {
        const { status } = await addWork({
            username: 'oops',
            company: 'company',
            companyUrl: 'companyUrl',
            position: 'position',
            info: 'info',
            from: '2010',
            to: '2020'
        });

        const workCount = await Work.count();

        expect(status).toBe(false);
        expect(workCount).toBe(0);
    });

    it(`should get user works`, async () => {
        const { user } = await register({
            username: 'username',
            email: 'email@em.com',
            fullName: 'fullName',
            password: 'password'
        });

        await addWork({
            username: user.username,
            company: 'company',
            companyUrl: 'companyUrl',
            position: 'position',
            info: 'info',
            from: '2010',
            to: '2020'
        });

        await addWork({
            username: user.username,
            company: 'company 2',
            companyUrl: 'companyUrl2',
            position: 'position2',
            info: 'info2',
            from: '2020',
            to: ''
        });

        const works = await getWorkExperiences(user.username);

        expect(works.length).toBe(2);
    })
});

/*

it(``, async () => {

});

*/
