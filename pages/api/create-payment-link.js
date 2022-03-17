import { useState } from "react";

export default function handler(req, res){
    const mid = '123asd'
    const mkey = '123asd'
    

    // Encode the String
    const encoded_string = Buffer.from(mid + mkey).toString('base64');

    
    if(req.method == 'POST'){
        
        if(encoded_string == req.headers.authorization){


            res.status(200).json({ 
                encoded: encoded_string ,
                method: req.method,
                test : req.headers.authorization,
                amount : req.body.amount
            })
        }else{
            res.status(400).json({
                message: 'unauthorized access'
            })
        }
    }else{
        res.status(400).json({
            message: 'bad request'
        })
    }


}

