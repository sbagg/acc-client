const Pool = require('pg').Pool

const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'acc',
  password: 'myPassword',
  port: 5432,
})

// basic endpoint
 
const index = (request, response) => {
  response.status(200).json({ info: 'Application started successfully' });
};

const getKc = (request, response) => {
    pool.query('SELECT * FROM kc_cups ORDER BY id ASC', (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
}

const getKcDates = (request, response) => {
    pool.query('SELECT * FROM kc_cups_dates ORDER BY id ASC', (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
}
const getEto = (request, response) => {
    pool.query('SELECT * FROM eto ORDER BY pid ASC', (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
}

const getGrid = (request, response) => {
    pool.query('SELECT * FROM grid ORDER BY pid ASC', (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
}

const getCalcs = (request, response) => {
    pool.query('SELECT * FROM calculations ORDER BY crop ASC', (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
    })
}

const getKcById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM kc_cups WHERE id = $1', [id], (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
    })
}

const getKcByDateId = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM kc_cups_dates WHERE id = $1', [id], (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
    })
}

const getEtoById = (request, response) => {
    const pid = parseInt(request.params.pid)

    pool.query('SELECT * FROM eto WHERE pid = $1', [pid], (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
    })
}

const getGridById = (request, response) => {
    const pid = parseInt(request.params.pid)

    pool.query('SELECT * FROM eto WHERE pid = $1', [pid], (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
    })
}

const getCalcsByID = (request, response) => {
    const crop = parseInt(request.params.crop)
    const date = parseInt(request.params.date)

    pool.query('SELECT * FROM calculations WHERE crop = $1 AND date = $2', [crop, date], (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
    })
}
const deleteCalcsByID = (request, response) => {
    const crop = parseInt(request.params.crop)
    const date = parseInt(request.params.date)

    pool.query('DELETE FROM calculations WHERE crop = $1 AND date = $2', [crop, date], (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Calculation for crop deleted with ID: ${id}`)
      })
}
const addCalcs = (request, response) => {
    const { calculation_id, 
            date, 
            crop, 
            kc_date, 
            kc_growth, 
            eto, 
            etc, 
            etc_estimate, 
            creation_date 
          } = request.body

    pool.query('INSERT INTO users (calculation_id, date, crop, kc_date, kc_growth, eto, etc, etc_estimate, creation_date) VALUES ($1, $2)', [calculation_id, date, crop, kc_date, kc_growth, eto, etc, etc_estimate, creation_date], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Calculation added with ID: ${result.insertId}`)
    })
}

const getSample = (request, response) => {
  pool.query('SELECT * FROM sample', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

module.exports = {
    getKc,
    getEto,
    getGrid,
    getKcDates,
    getCalcs,
    getKcById,
    getKcByDateId,
    getEtoById,
    getGridById,
    getCalcsByID,
    deleteCalcsByID,
    addCalcs,
    getSample,
  }