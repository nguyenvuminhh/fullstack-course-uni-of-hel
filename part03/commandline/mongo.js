const mongoose = require('mongoose')

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://nvminh2005:${password}@phonebook.ycuxf81.mongodb.net/?retryWrites=true&w=majority&appName=phonebook`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const contactSchema = new mongoose.Schema({
    name: {
        type: String
        //minLength: 3,
        //required: true
    },
    number: {
        type: String
    }
})

const Contact = mongoose.model('Contact', contactSchema)

if (name) {

    const newContact = new Contact(
        {
            name:name,
            number:number
        }
    )

    newContact.save().then( () => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    }
    )
} else {
    Contact.find({}).then(result => {
        const list = result.map(a => a.name + ' ' + a.number + '\n')
        console.log("phonebook: \n", ...list)
        mongoose.connection.close()
    })
    
}
