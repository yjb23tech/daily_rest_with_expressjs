const Joi = require('joi')
const express = require('express')
const app = express()

app.use(express.json())

const team_alpha = [

    {id: 1, name: 'Ryu'}, 
    {id: 2, name: 'Ken'}, 

]

const team_beta = [

    {id: 1, name: 'Akuma'}, 
    {id: 2, name: 'M Bison'}

]

app.get('/', (req, res) => {
    res.send('I feel so alive!!!')
})

app.get('/api/teams/alpha', (req, res) => {

    let available_players = ``

    for (let player of team_alpha) {
        available_players += `

            <p>Welcome ${player.name}</p>
            
        `
    }
    res.send(available_players)
})

app.listen(3000, () => {
    console.log("I met Ojerime XD")
})

