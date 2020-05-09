const { User } = require('../../schema/users');
const _ = require('lodash');
const { ObjectID } = require('mongodb');
const bcrypt = require('bcryptjs');
const { getUserBearer } = require('../../utils');

async function getUsers(req, res) {
    try {
        const users = await User.find();
        res.status(200).send({ users });
    } catch (error) {
        res.status(400).send(error);
    }
}

async function addUser(req, res) {
    try {
        var body = _.pick(req.body, ['username', 'email', 'password']);

        var user = new User(body);
        await user.save();
        delete user.password;
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
}

async function signUp(newBody, data) {
    try {
        var user = new User(newBody);
        await user.save();
        return user._id;
    } catch (error) {
        return error;
    }
}

async function getUser(req, res) {
    try {
        var id = req.params.id;
        if (!ObjectID.isValid(id)) return res.status(404).send();

        const user = await User.findById(id,{password:0});
        if (!user) return res.status(404).send();

        res.status(200).send({ user });
    } catch (error) {
        res.status(400).send(error);
    }
}

async function patchUser(req, res) {
    try {
        var id = req.params.id;
        var body = _.pick(req.body, ['username', 'password', 'tags']);
        if (!ObjectID.isValid(id)) return res.status(400).send();

        const user = await User.findByIdAndUpdate(id,{password:0}, { $set: body }, { new: true });
        if (!user) return res.status(404).send();
        
        res.status(200).send({ user });
    } catch (error) {
        res.status(400).send(error);
    }
}

async function deleteUser(req, res) {
    try {
        var id = req.params.id;
        if (!ObjectID.isValid(id)) return res.status(404).send();
        const user = await User.findByIdAndDelete(id);
        if (!user) return res.status(404).send('Not Found');
        res.status(204).send({ user });
    } catch (error) {
        res.status(400).send(error);
    }
}

async function login(req, res) {
    try {
        const { password,username } = req.body;

        let user = await User.findOne({ username: username });
        if (!user) return res.status(401).json({message: 'Mot de passe ou mail incorrect'});
        
        // validate password
        let passwordValid = await user.comparePassword(password);
        if (!passwordValid) return res.status(401).json({message: 'Mot de passe ou mail incorrect'});
        delete user.password;
        res.status(201).send({ token: user.generateJWT(),user:user });
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};

async function loginJWT(req, res) {
    try {
        const { token } = req.body;
        let actifUser = getUserBearer(req);
        let user = await User.findById(actifUser.id,{password:0 });
        const tokenValid = user.validateJWT(token);
        if (!tokenValid) return res.status(401).json({message: 'Bad token'});
        res.status(201).send({ user:user });
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};

exports.addUser = addUser;
exports.signUp = signUp;
exports.getUsers = getUsers;
exports.getUser = getUser;
exports.patchUser = patchUser;
exports.deleteUser = deleteUser;
exports.login = login;
exports.loginJWT = loginJWT;