import { Magic } from "@magic-sdk/admin"
import Iron from '@hapi/iron'
import CookiesService from '../../lib/cookie'
 
//let magic = new Magic(process.env.MAGIC_SECRET_KEY)

export default async (req, res) => {
    return res.json({
        message: 'this is post'
    })
    
    if(req.method !== 'POST'){
        return res.status(300).end()
    }else{
    }

    const did = req.headers.authorization.split('Bearer').pop().trim()
    const user = await new Magic(process.env.MAGIC_SECRET_KEY).users.getMetadataByToken(did)

    const token = await Iron.seal(user, process.env.ENCRYPTION_SECRET, Iron.defaults)
    CookiesService.setTokenCookie(res, token)

    res.end()
}