const express = require('express')
const app = express()
//ajout de la liste des parkings
const parkings = require('./parkings.json')
const reservations = require('./reservation.json')

//MIDDLEWARE (interprête)
app.use(express.json())

//  ROUTE


// route pour la liste des parkings
app.get('/parkings', (req,res) => {
  res.status(200).json(parkings)
})

// route pour la liste des reservation
app.get('/reservations', (req,res) => {
  res.status(200).json(reservations)
})

// RESERVAION

app.get('/reservations/:id', (req,res) => {
  const id = parseInt(req.params.id)
  const reservation = reservations.find(reservation => reservation.id === id)
  res.status(200).json(reservation)
})

app.post('/reservations', (req,res) => {
  reservations.push(req.body)
  pes.status(200).json(parkings)
})

app.put('/reservations/:id', (req,res) => {
  const id = perseInt(req.params.id)
  let reservation = reservations.find(reservation => reservation.id === id)
  reservation.parking = req.body.parking
  reservation.parkingid = req.body.parkingid
  reservation.city = req.body.city
  reservation.clientName = req.body.clientName
  reservation.vehicule = req.body.vehicule
  reservation.licencePlate = req.body.licencePlate
  reservation.checkin = req.body.checkin
  reservation.checkout = req.body.checkout
})

app.delete('/reservations/:id', (req,res) => {
  const id = parseInt(req.params.id)
  let reservation = reservations.find(reservation => reservation.id === id)
  reservations.splice(reservations.indexOf(reservation),1)
  res.status(200).json(reservations)
})
// PARKING

// route get id parkings
app.get('/parkings/:id', (req,res) => {
    const id = parseInt(req.params.id) // Convertion en nombre
    const parking = parkings.find(parking => parking.id === id)
    res.status(200).json(parking)
})

// route post parking
app.post('/parkings', (req,res) => {
  parkings.push(req.body)
  pes.status(200).json(parkings)
})

// route put parkings
app.put('/parkings/:id', (req,res) => {
  const id = parseInt(req.params.id)
  let parking = parkings.find(parking => parking.id === id)
  parking.name = req.body.name,
  parking.city = req.body.city,
  parking.type = req.body.type
  res.status(200).json(parking)
})

// route delete parking
app.delete('/parkings/:id', (req,res) => {
  const id = parseInt(req.params.id)
  let parking = parkings.find(parking => parking.id === id)
  parkings.splice(parkings.indexOf(parking),1)
  res.status(200).json(parkings)
})
app.listen(8080, () => {
  console.log("Serveur à l'écoute")
})
