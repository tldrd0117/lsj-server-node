// Table "public.app_user"
// Column    |            Type             | Collation | Nullable |               Default                
// -------------+-----------------------------+-----------+----------+--------------------------------------
// id          | integer                     |           | not null | nextval('app_user_id_seq'::regclass)
// userid      | text                        |           | not null | 
// password    | text                        |           | not null | 
// name        | text                        |           | not null | 
// email       | text                        |           | not null | 
// create_time | timestamp without time zone |           |          | 
// authority   | text                        |           | not null | 
const Query = require('../Query');

const insert = new Query({
    name: 'insert',
    text: `INSERT INTO 
                APP_USER(userid, password, name, email, authority) 
            VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    params: ['userid', 'password', 'name', 'email', 'authority']
})

const selectId = new Query({
    name: 'selectId',
    text: `SELECT 
                id,
                userid,
                password,
                name,
                email,
                create_time,
                authority
            FROM APP_USER
            WHERE userid=$1`,
    params: ['userid']
})

module.exports = {
    ...insert.makeRequestQuery(),
    ...selectId.makeRequestQuery()
};

