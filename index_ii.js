const config = require('config')
const Joi = require('joi')
const logger = require('./logger')
const authenticator = require('./authentication')
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')

const app = express()

console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
console.log(`app: ${app.get('env')}`)

app.use(helmet())

// Configuration 
console.log('Application Name: ' + config.get('name'))
console.log('Mail Server: ' + config.get('mail.host'))
console.log('Mail Password: ' + config.get('mail.password'))

if (app.get('env') === 'development') {
    app.use(morgan('tiny'))
    console.log('Morgan enabled')
}

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))

app.use(logger)

app.use(authenticator)

const courses = [

    {id: 1, name: 'Object Oriented Programming'}, 
    {id: 2, name: 'Data Structures and Algorithms'}, 
    {id: 3, name: 'Application Programming Interfaces'}

]

app.get('/', (req, res) => {
    res.send('Hakeem Olajuwon')
})

app.get('/api/courses', (req, res) => {

    let myStudies = ``

    for (let course of courses) {

        myStudies += `
        
            <p>This year I will be completing a module on: ${course.name}<br></p>

        `

    }
    res.send(myStudies)
})

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) {
        res.status(400).send(`The course with the given id of ${req.params.id} was not found unfortunately!`)
        return 
    } else {
        res.send(`I am particularly looking forward to studying ${course.name}`)
    }
})

app.post('/api/courses', (req, res) => {

    const { error } = validateCourse(req.body)
    if (error) {
        res.status(400).send(error.details[0].message)
        return
    } 

    const course = {
        id: courses.length + 1, 
        name: req.body.name
    }
    courses.push(course)
    res.send(course)
})

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) {
        res.status(400).send('We nuh have dat')
        return 
    }

    const { error } = validateCourse(req.body)
    if (error) {
        res.status(400).send('We definitely cyant do dat')
        return
    }

    course.name = req.body.name 
    res.send(course)
})

function validateCourse(course) {
    
    const schema = Joi.object({
        name: Joi.string()
            .alphanum()
            .min(3)
            .required()
    })
    return (schema.validate(course))
}

app.listen(3000, () => {
    console.log("All quiet on the Western Front...")
})

