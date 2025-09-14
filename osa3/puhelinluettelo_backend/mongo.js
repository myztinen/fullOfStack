const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Not enough arguments')
  process.exit(1)
}

const password = process.argv[2]



const url = `mongodb+srv://myztinen_db_user:${password}@cluster0.mywrkse.mongodb.net/puhelinluettelo?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const entrySchema = new mongoose.Schema({
  name: String,
  number: String,

})

const Person = mongoose.model('entry', entrySchema)
if (process.argv.length === 5) {
  const name = process.argv[3]
  const phoneNumber = process.argv[4]



  const person = new Person({
    name: name,
    number: phoneNumber,
  })

  person.save().then(() => {
    console.log(`added ${name} number ${phoneNumber}to phonebook`)
    mongoose.connection.close()
  })
} else {
  console.log('Phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, ' ', person.number)
    })
    mongoose.connection.close()
  })
}
