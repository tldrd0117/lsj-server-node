const selectAll = (obj)=>({
    text: `SELECT 
                title, 
                body, 
                id, 
                create_time, 
                author, 
                tags 
            FROM Post 
            WHERE type=$1 
            ORDER BY id DESC`,
    values: [obj.type]
});
const insert = (obj) => ({
    text: `INSERT INTO 
                Post(type, title, body, author, tags) 
            VALUES ($1, $2, $3, $4, $5) RETURNING id`,
    values: [obj.type, obj.title, obj.body, obj.author, obj.tags]
})

const update = (obj) => ({
    text: `UPDATE Post 
            SET type=$1, 
                title=$2, 
                body=$3, 
                author=$4, 
                tags=$5, 
                update_time=now() 
            WHERE id=$6 
            RETURNING id`,
    values: [obj.type, obj.title, obj.body, obj.author, obj.tags, obj.id]
})

const deleteQry = (obj) => ({
    text: `DELETE FROM Post 
            WHERE id = $1 
            RETURNING id`,
    values: [obj.id]
})

module.exports = {
    selectAll,
    insert,
    update,
    deleteQry
}