import Adminloging from "../models/AdminModel.js";
import jwt from "jsonwebtoken"

export const refreshToken = async(req, res) => {
    try {
        const refreshToken = req.query.refreshToken;  
        if(!refreshToken) return res.sendStatus(401);
        const admin = await Adminloging.findAll({
            where:{
                refresh_token: refreshToken
            }
        });
        if(!admin[0]) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.sendStatus(403);
            const adminId = admin[0].id;
            const Username = admin[0].Username;
            const accessToken = jwt.sign({adminId,Username}, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: '15s'
            });
            res.json({ accessToken });
        });
    } catch (error) {
        console.log(error);
    }
}