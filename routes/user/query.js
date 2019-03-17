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
const insert = (obj) => ({
    text: `INSERT INTO 
                APP_USER(userid, password, name, email, authority) 
            VALUES ($1, $2, $3, $4, $5) RETURNING id`,
    values: [obj.userid, obj.password, obj.name, obj.email, obj.authority]
})

const selectId = (obj) => ({
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
    values: [obj.userid]
})

module.exports = {
    insert,
    selectId
}

