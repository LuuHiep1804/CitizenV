import { AccountModel } from "../models/AccountModel.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateTokens = payload => {
   const {_id, role} = payload;

    //create JWT
    const accessToken = jwt.sign(
        {_id, role},
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: '30m'
        }
    );

    const refreshToken = jwt.sign(
        {_id, role},
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: '2h'
        }
    )
    return {accessToken, refreshToken};
}

const updateRefreshToken = async (userId, refreshToken) => {
    await AccountModel.updateOne({
        _id: userId
    }, {
        refreshToken: refreshToken
    });
}

export const login = async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const data = await AccountModel.findOne({
            username: username,
            password: password
        });
        if (data) {
            const tokens = generateTokens(data);
            updateRefreshToken(data._id, tokens.refreshToken);
            res.status(200).json(tokens);
        }else {
            res.sendStatus(401);
        }
    } catch (err) {
        res.status(500).json({error: err});
    }
}

//khi accessToken hết hạn, sẽ dùng refreshToken để tạo 1 accessToken mới
export const getAccessToken = async (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) res.sendStatus(401);
    const user = await AccountModel.findOne({refreshToken: refreshToken});
    if (!user) res.sendStatus(403);
    try {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const tokens = generateTokens(user);
        updateRefreshToken(user._id, tokens.refreshToken);
        res.status(200).json(tokens);
    } catch (error) {
        res.sendStatus(403);
    }
}

export const getUser = async (req, res) => {
    try {
        const data = req.data;
        const user = await AccountModel.findById(data._id);
        user.password = "";
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({error: err});
    }
}

//khi đăng xuất, refreshToken sẽ bị xóa trong database
export const logout = async (req, res) => {
    try {
        const data = req.data;
        updateRefreshToken(data._id, "");
        res.status(200).json("đã xóa refreshToken");
    } catch (err) {
        res.status(500).json({error: err});
    }
}

export const register = async (req, res) => {
    try {
        let role = '';
        let authRole = req.data.role;
        if (authRole == 'A1') {
            role = 'A2';
        }else if(authRole == 'A2') {
            role = 'A3';
        }else if(authRole == 'A3') {
            role = 'B1';
        }else {
            role = 'B2';
        }
        const info = {
            _id: req.body._id,
            username: req.body.username,
            password: req.body.password,
            role: role
        };
        const check = await AccountModel.findOne({username: info.username});
        if (check) {
            res.status(500).json('account is available');
        }else {
            const user = new AccountModel(info);
            await user.save();
            res.status(200).json('register success!');
        }
    } catch (err) {
        res.status(500).json({error: err});
    }
}

export const update = async (req, res) => {
    try {
        const _id = req.params._id;
        const info = req.body;
        await AccountModel.findByIdAndUpdate(_id, info);
        res.status(200).json('update success!');
    } catch (err) {
        res.status(500).json({error: err});
    }
}

export const getRoleA2 = async (req, res) => {
    try {
        let users = await AccountModel.find({role: 'A2'});
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({error: err});
    }
}

export const getRoleA3 = async (req, res) => {
    try {
        const checkManager = req.data._id;
        const usersA3 = await AccountModel.find({role: 'A3'});
        let users = usersA3.filter(userA3 => {
            return userA3._id.slice(0,2) === checkManager;
        });
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({error: err});
    }
}

export const getRoleB1 = async (req, res) => {
    try {
        const checkManager = req.data._id;
        const usersB1 = await AccountModel.find({role: 'B1'});
        let users = usersB1.filter(userB1 => {
            return userB1._id.slice(0,4) === checkManager;
        });
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({error: err});
    }
}

export const getRoleB2 = async (req, res) => {
    try {
        const checkManager = req.data._id;
        const usersB2 = await AccountModel.find({role: 'B2'});
        let users = usersB2.filter(userB2 => {
            return userB2._id.slice(0,6) === checkManager;
        });
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({error: err});
    }
}