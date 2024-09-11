'use strict'
const mongoose = require('mongoose');
const userModel = mongoose.model('Users');

const responder = require('../helper/responder')
const md5 = require('md5-nodejs');
const jwt = require('jsonwebtoken');

// Function for creating new user
exports.createUser = async (req, res, next) => {
    try {
        let body = req.body;
        let user = req.user;
        let hash = md5(body.userPassword).toString();
        let insertObject = {
            userName: body.userName,
            userEmail: body.userEmail,
            userPassword: hash,
            createDate: new Date().toUTCString(),
        }
        const isUserExisting = await userModel.findOne({ userEmail: body.userEmail });
        if (isUserExisting) {
            return responder.sendError(res, "User already exist", 409);
        }
        let userCreated = await userModel.create(insertObject);
        if (userCreated) {
            responder.sendSuccess(res, "User Created Successfully");
            return;
        }
    } catch (error) {
        console.log(error);
        return responder.sendError(res, error.message)
    }
}

// Function for user login with email and password
exports.loginUser = async (req, res, next) => {
    try {
        let body = req.body;
        let hash = md5(body.userPassword).toString();

        let whereObj = {
            userEmail: body.userEmail,
            userPassword: hash,
        }

        let user = await userModel.findOne(whereObj);
        if (!user) {
            return responder.sendError(res, "Please enter correct credentials", 401);
        }
        let userJsonObj = JSON.parse(JSON.stringify(user));
        let token = await genToken(userJsonObj);
        responder.sendSuccess(res, "Token Generated Successfully", { token: token });
    } catch (error) {
        return responder.sendError(res, error.message)
    }

}

// Function for updating profile
exports.updateProfile = async (req, res, next) => {
    try {
        let body = req.body;
        let updateObj = {
            userEmail: body.userEmail,
            userName: body.userName
        };
        let user = req.user;
        const query = { _id: Object(user._id) };
        const userUpdated = await userModel.findOneAndUpdate(query, updateObj, {
            new: true
        });
        if (!userUpdated) {
            return responder.sendError(res, "No data found", 404)
        } else {
            responder.sendSuccess(res, "Profile Updated Successfully", userUpdated);
        }
    } catch (error) {
        return responder.sendError(res, error.message)
    }

}

// Function for getting paginated user data
exports.getUsersList = async (req, res, next) => {
    try {

        let query = req.query;
        const pageNo = parseInt(query.page) || 1;
        const limit = parseInt(query.limit) || 10;
        const skip = (pageNo - 1) * limit;

        const totalData = await userModel.countDocuments();
        const totalPages = Math.ceil(totalData / limit);

        let usersList = await userModel.find().skip(skip).limit(limit);
        if (!usersList) {
            return responder.sendError(res, "No data found", 404);
        }
        let paginatedData = {
            count: totalData,
            totalPages: totalPages,
            currentPage: pageNo,
            results: usersList
        }
        responder.sendSuccess(res, "Users List Retrieved Successfully", paginatedData);
        return;
    } catch (error) {
        return responder.sendError(res, error.message)
    }
}

// Function for deleting user by id
exports.deleteUserById = async (req, res, next) => {
    try {
        let id = req.params.id;
        let userDeleted = await userModel.findByIdAndDelete(id);
        if (!userDeleted) {
            return responder.sendError(res, "No user found", 404)
        }
        responder.sendSuccess(res, "User deleted Successfully", userDeleted);
        return;
    } catch (error) {
        return responder.sendError(res, error.message)
    }
}

// Function for retrieving users list
exports.filterUsersList = async (req, res, next) => {
    try {
        let filter = {};
        let query = req.query;
        if (query.filterKeyword) {
            filter = {
                $or: [
                    { userName: { $regex: query.filterKeyword, $options: 'i' } },
                    { userEmail: { $regex: query.filterKeyword, $options: 'i' } }
                ]
            }
        }

        let usersList = await userModel.find(filter);
        if (!usersList) {
            return responder.sendError(res, "No record found", 404);
        }
        responder.sendSuccess(res, "Users List Retrieved Successfully", usersList);
        return;
    } catch (error) {
        return responder.sendError(res, error.message)
    }
}

// Function for generating token 
async function genToken(data) {
    return new Promise(async function (resolve, reject) {
        jwt.sign(data, 'secret', { expiresIn: "1h", }, (err, token) => {
            if (err) {
                reject(err);
            }
            resolve(token);
        }
        );
    })
}