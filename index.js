const express = require('express');
const app = express();

app.use(express.json());

//identification
const Pool = require('pg').Pool
const pool = new Pool({

  user: 'lvando',
  host: '10.2.2.30',
  database: 'extranet',
  password: 'W4"yS"^Z[n,TJ3*~',
  port: '5435',

})

//connexion & erreur
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack)
  }
  client.query('SELECT NOW()', (err, result) => {
    release()
    if (err) {
      return console.error('Error executing query', err.stack)
    }
    console.log(result.rows)
  })
})

  
app.get('/:id_equipement', (req,res) => {
try {
  pool.query('select * from rhino.elements where id_equipement=$1', [req.params.id_equipement], (error, results) => {
    if (error) {
      console.log(error)
      res.status(500).json(null)
    }
    if (results===undefined) res.status(404)
    if (results !== undefined){
      res.status(200).json(results.rows)
    } else res.status(404)
  })
  } catch(e){
    res.status(500)
  }

});

app.get('/liste_types/:id_types', (req,res) => {
try {
  pool.query('select libelle from v1.libelles where id=$1', [req.params.id_types] , (error, results) => {
    if (error) {
      console.log(error)
      res.status(500).json(null)
    }
    if (results===undefined) res.status(404)
    if (results !== undefined){
      res.status(200).json(results.rows)
    } else res.status(404)
  })
  } catch(e){
    res.status(500)
  }

});


app.post('/:id_equipement', (req,res) => {
  const { id_equipement , id_element , libelle } = req.body
	console.log(req.body)
  pool.query('INSERT INTO rhino.elements (id_equipement ,id_element ,libelle) VALUES ($1, $2, $3)', [id_equipement,id_element,libelle], (error, results) => {
    if (error) {
      throw error
      console.log(error)
      res.status(500).json()
    }
    console.log(results)
    res.status(200).json(results.rows)
  })
});

app.delete('/:id_equipement/:id_element', (req,res) => {
     const id_element = parseInt(req.params.id_element)
     const id_equipement = parseInt(req.params.id_equipement)
    pool.query('DELETE FROM rhino.elements WHERE id_equipement = $1 AND id_element = $2 LIMIT 1', [id_equipement, id_element], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send(`Element supprime numero : ${id_element}`)
   })
});

app.listen(8080, () => {
    console.log("Serveur : OK")
  })
