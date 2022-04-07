require('dotenv').config()
const { connect, Schema, model } = require("mongoose")

connect(process.env[ "MONGO_URI" ], { useNewUrlParser: true, useCreateIndex: true })

// Schema for person
const personSchema = new Schema({ name: { type: String, required: true, trim: true, unique: true }, age: Number, favoriteFoods: [ String ] })

let Person = model('Person', personSchema)

const createAndSavePerson = async (done) => {
  const personDoc = new Person({ name: 'Sushant', age: 20, favoriteFoods: [ 'Poha', 'Rice Plate' ] })
  await personDoc.save(function (err, data) {
    if (err) {
      done(err)
    } else {
      done(null, data)
    }
  })
}

const createManyPeople = async (arrayOfPeople, done) => {
  await Person.create(arrayOfPeople, function (err, data) {
    if (err) {
      done(err)
    } else {
      done(null, data)
    }
  })
}

const findPeopleByName = async (personName, done) => {
  await Person.find({ name: personName }, function (err, data) {
    if (err) {
      done(err)
    } else {
      done(null, data)
    }
  })
}

const findOneByFood = async (food, done) => {
  await Person.findOne({ favoriteFoods: food }, function (err, data) {
    if (err) {
      done(err)
    } else {
      done(null, data)
    }
  })
}

const findPersonById = async (personId, done) => {
  await Person.findById(personId, function (err, data) {
    if (err) {
      done(err)
    } else {
      done(null, data)
    }
  })
}

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger"
  Person.findById(personId, function (err, individual) {
    if (err) return console.log(err)
    individual.favoriteFoods.push(foodToAdd)
    individual.save(function (error, result) {
      if (error) return console.log(error)
      done(null, result)
    })
  })
}

const findAndUpdate = (personName, done) => {
  const ageToSet = 20
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, function (err, data) {
    if (err) return console.log(err)
    done(null, data)
  })
}

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function (err, data) {
    if (err) return console.log(err)
    done(null, data)
  })
}

const removeManyPeople = async (done) => {
  const nameToRemove = "Mary"
  let response = await Person.remove({ name: nameToRemove })
  done(null, { n: response.nRemoved, ok: 1 })
}

const queryChain = (done) => {
  const foodToSearch = "burrito"
  Person.find({ favoriteFoods: foodToSearch }).sort({ name: 1 }).limit(2).select({ age: 0 }).exec((err, data) => done(err, data))
}

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person
exports.createAndSavePerson = createAndSavePerson
exports.findPeopleByName = findPeopleByName
exports.findOneByFood = findOneByFood
exports.findPersonById = findPersonById
exports.findEditThenSave = findEditThenSave
exports.findAndUpdate = findAndUpdate
exports.createManyPeople = createManyPeople
exports.removeById = removeById
exports.removeManyPeople = removeManyPeople
exports.queryChain = queryChain
