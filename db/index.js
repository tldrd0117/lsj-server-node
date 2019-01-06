const Pool = require('pg').Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

module.exports = {
  query: (text, params) => pool.query(text, params)
  
}

