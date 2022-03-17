const { connectToDatabase } = require('../../lib/mongodb')
const ObjectId = require('mongodb').ObjectId

export default async function handler(req, res){
    switch (req.method){
        case 'GET' : {
            
        }

        case 'POST' : {
            return addUser(req, res)
        }

        case 'PUT' : {
            
        }

        case 'DELETE' : {
            
        }
    }
}

async function addUser(req, res){
    try{
        let { db } = await connectToDatabase()
        await db.collection('users').insertOne(JSON.parse(req.body))

        return res.json({
            message: 'You are now registered',
            success: true
        })
    }catch(error){
        return res.json({
            message: new Error(error).message,
            success: false
        })
    }
}