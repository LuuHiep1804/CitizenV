import { AccountModel } from "../models/AccountModel.js";
import jwt from 'jsonwebtoken';

export const getToken = async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const data = await AccountModel.findOne({
            username: username,
            password: password
        });
        if (data) {
            const token = jwt.sign({token: data._id}, 'hiep184');
            const result = {
                message: 'login success!',
                token: token
            };
            res.status(200).json(result);
        }else {
            res.status(500).json('mật khẩu hoặc tài khoản không chính xác!');
        }
    } catch (err) {
        res.status(500).json({error: err});
    }
}

export const getUser = async (req, res) => {
    try {
        const token = req.params.token;
        var decoded = jwt.verify(token, 'hiep184');
        res.status(200).json(decoded);
    } catch (err) {
        res.staus(500).json('token không hợp lệ!');
    }
}