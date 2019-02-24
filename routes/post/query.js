const selectAll = (obj)=>({
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
            SET title=$1, 
                body=$2, 
                author=$3, 
                tags=$4, 
                update_time=now() 
            WHERE id=$5 
            RETURNING id`,
    values: [obj.title, obj.body, obj.author, obj.tags, obj.id]
})

const deleteQry = (obj) => ({
    text: `DELETE FROM Post 
            WHERE id = $1 
            RETURNING id`,
    values: [obj.id]
})

const view = (obj) => ({
    text: `UPDATE Post
            SET view=view+1
            WHERE id=$1
            RETURNING id`,
    values: [obj.id]
})
const likenum = (obj) => ({
    text: `UPDATE Post
            SET likenum=likenum+1
            WHERE id=$1
            RETURNING id`,
    values: [obj.id]
})

module.exports = {
    selectAll,
    insert,
    update,
    deleteQry,
    view,
    likenum
}