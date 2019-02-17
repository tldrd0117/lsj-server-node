const Pool = require('pg').Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://ilpbqrcqvkseil:0644b519926d6079dff0d82bed436ad34f2cb5a594da475d2f8c27da4ffff63b@ec2-174-129-18-247.compute-1.amazonaws.com:5432/dcsl4qthagptm0'
})

module.exports = {
  query: (text, params) => pool.query(text, params),
  connect: () => (pool.connect())
}

