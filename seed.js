const {faker} = require('@faker-js/faker');

const userModel = require('./model/User.model')


const seedUser = ()=>{

    for(let i = 0; i < 5; i++){
        const user = new userModel({
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        })

        user.save()
    }
}

module.exports = seedUser