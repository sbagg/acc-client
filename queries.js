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
  const result = pool.query('SELECT * FROM kc_cups ORDER BY id ASC');
  return result; 
}

const getKcDates = (request, response) => {
  const result = pool.query('SELECT * FROM kc_cups_dates ORDER BY id ASC');
  return result;
}
const getEto = (request, response) => {
  const result = pool.query('SELECT * FROM eto ORDER BY pid ASC');

  return result;
}

const getGrid = (request, response) => {
  const result = pool.query('SELECT * FROM grid ORDER BY pid ASC');

  return result;

}

const getCalcs = (request, response) => {
  const result = pool.query('SELECT * FROM calculations ORDER BY crop ASC');
  return result;

}

const getKcById = (request, response) => {
    const id = parseInt(request.params.id)

    const result = pool.query('SELECT * FROM kc_cups WHERE id = $1', [id]);
    return result;

}

const getKcByDateId = (request, response) => {
    const id = parseInt(request.params.id)

    const result = pool.query('SELECT * FROM kc_cups_dates WHERE id = $1', [id]);
    return result;

}

const getEtoById = (request, response) => {
    const pid = parseInt(request.params.pid);

    const result = pool.query('SELECT * FROM eto WHERE pid = $1', [pid]);
    return result;

}

const getGridById = (request, response) => {
  const pid = parseInt(request.params.pid);

  const result = pool.query('SELECT * FROM eto WHERE pid = $1', [pid]);
  return result;
}

const getCalcsByID = (request, response) => {
    const crop = parseInt(request.params.crop)
    const date = parseInt(request.params.date)

    const result = pool.query('SELECT * FROM calculations WHERE crop = $1 AND date = $2', [crop, date])
    return result;
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

    pool.query('INSERT INTO users (calculation_id, date, crop, kc_date, kc_growth, eto, etc, etc_estimate, creation_date) VALUES ($1, $2, $3, $4 $5, $6 $7, $8 $9, $10)', [calculation_id, date, crop, kc_date, kc_growth, eto, etc, etc_estimate, creation_date], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Calculation added with ID: ${result.insertId}`)
    })
}

const getSample = async () => {
  const result = await pool.query('SELECT * FROM sample');
  return result;
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