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
            expiresIn: '10m'
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

const updateLicense = (user) => {
    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const now = `${date}/${month}/${year}`;
    if(user.license_status == false) {
        user.license_start = false;
        user.license_date = "";
        user.license_term = "";
    }else {
        if(user.license_date == now) {
            user.license_start = true
        }
        if(user.license_term < now) {
            user.license_status = false;
            user.license_start = false;
            user.license_date = "";
            user.license_term = "";
            checkLicense(user);
        }
    }
    updateUser(user);
}

const checkLicense = async (manager) => {
    if(manager.license_status == false) {
        if(manager.role !== 'B2') {
            let users = await AccountModel.find({manager: manager._id});
            for(let i = 0; i < users.length; i++) {
                users[i].license_status = false;
                updateUser(users[i]);
                updateLicense(users[i]);
                checkLicense(users[i]);
            }
        }
    }
    updateLicense(manager);
}

const updateUser = async (user) => {
    const newUpdate = new AccountModel(user);
    await newUpdate.save();
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
            res.status(401).json('mật khẩu hoặc tài khoản sai');
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
        let user = await AccountModel.findById(data._id);
        // checkLicense(user);
        let newUpdate = await AccountModel.findById(data._id);
        newUpdate.password = "";
        res.status(200).json(newUpdate);
    } catch (err) {
        res.status(500).json({error: err});
    }
}

//khi đăng xuất, refreshToken sẽ bị xóa trong database
export const logout = async (req, res) => {
    try {
        const data = req.data;
        updateRefreshToken(data._id, "");
        res.status(200).json('đã xóa refreshToken');
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
            role: role,
            manager: req.data._id
        };
        const check = await AccountModel.findOne({username: info.username});
        if (check) {
            res.status(400).json('account is available');
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
        let user = await AccountModel.findById(_id);
        checkLicense(user);
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

export const getRoleLower = async (req, res) => {
    try {
        const manager = req.data._id;
        let users = await AccountModel.find({manager: manager});
        for(let i = 0; i < users.length; i++) {
            // users[i] = await checkLicense(users[i]);
            // users[i] = await updateLicense(users[i]);
            // updateUser(users[i]);
            users[i].password = ""
        }
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({error: err});
    }
}