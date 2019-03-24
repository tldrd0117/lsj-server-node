// Table "public.post"
// Column    |            Type             | Collation | Nullable |             Default
// -------------+-----------------------------+-----------+----------+----------------------------------
// id          | integer                     |           | not null | nextval('post_id_seq'::regclass)
// type        | integer                     |           | not null |
// title       | text                        |           | not null |
// body        | text                        |           | not null |
// create_time | timestamp without time zone |           | not null | CURRENT_TIMESTAMP
// author      | text                        |           |          | 'lsj'::text
// tags        | text                        |           |          |
// update_time | timestamp without time zone |           |          |
// view        | integer                     |           |          |
// likenum     | integer                     |           |          |
// Indexes:
//  "post_pkey" PRIMARY KEY, btree (id)

const Query = require('../Query');

const selectAll = new Query({
    name: 'selectAll',
    text: `SELECT 
            title, 
            body, 
            id, 
            create_time, 
            update_time, 
            author, 
            tags,
            likenum,
            view
        FROM Post 
        WHERE type=$1 
        ORDER BY id DESC`,
    params: ['type']
})
const insert = new Query({
    name: 'insert',
    text: `INSERT INTO 
                Post(type, title, body, author, tags) 
            VALUES ($1, $2, $3, $4, $5) RETURNING id`,
    params: ['type', 'title', 'body', 'author', 'tags']
})

const update = new Query({
    name: 'update',
    text: `UPDATE Post 
            SET title=$1, 
                body=$2, 
                author=$3, 
                tags=$4, 
                update_time=now() 
            WHERE id=$5 
            RETURNING id`,
    params: ['title', 'body', 'author', 'tags', 'id']
})

const deleteQry = new Query({
    name: 'deleteQry',
    text: `DELETE FROM Post 
            WHERE id = $1 
            RETURNING id`,
    params: ['id']
})

const view = new Query({
    name: 'view',
    text: `UPDATE Post
            SET view=view+1
            WHERE id=$1
            RETURNING id`,
    params: ['id']
})

const likenum = new Query({
    name: 'likenum',
    text: `UPDATE Post
            SET likenum=likenum+1
            WHERE id=$1
            RETURNING id`,
    params: ['id']
})

module.exports = {
    ...selectAll.makeRequestQuery(),
    ...insert.makeRequestQuery(),
    ...update.makeRequestQuery(),
    ...deleteQry.makeRequestQuery(),
    ...view.makeRequestQuery(),
    ...likenum.makeRequestQuery()
};
