const { User }     = require('../../schema/users');
const _            = require('lodash');
const { mongoose } = require('../../db/mongoose');
const { ObjectID } = require('mongodb');

function addUser(req, res)
{
    var body = _.pick(req.body, ['username', 'password', 'alive','tags']);
    var user = new User(body);

    user.save().then(doc => {
        res.status(201).send(doc);
    }).catch(err => {
        res.status(400).send(err);
    })
}

async function signUp(newBody,data)
{
  var user = new User(newBody);
  let id;
  await user.save().then(doc => {
      id = doc._id;
  });
  return id;
}

function getUsers(req, res)
{
    User.find().then(users => {
        res.status(200).send({ users });
      }).catch(err => {
        res.status(400).send(err);
      })
}

function getUser(req, res)
{
    var id = req.params.id;
    if (!ObjectID.isValid(id))
      return res.status(404).send();
    User.findById(id).then(user => {
      if (!user)
        return res.status(404).send();
      res.status(200).send({ user });
    }).catch(err => {
      res.status(400).send(err);
    })
}

function patchUser(req, res)
{
    var id = req.params.id;
    var body = _.pick(req.body, ['username', 'alive', 'password', 'tags']);
  
    if (!ObjectID.isValid(id))
      return res.status(400).send();
    User.findByIdAndUpdate(id, {$set: body}, {new: true}).then(user => {
      
      if (!user) {
        return res.status(404).send();
      }
      res.status(200).send({user});
    }).catch(err => res.status(400).send());
}

function deleteUser(req, res)
{
    var id = req.params.id;
    if (!ObjectID.isValid(id))
      return res.status(404).send();
    User.findByIdAndDelete(id).then(user => {
      if (!user)
        return res.status(404).send();
      res.status(204).send({user});
    }).catch(err => res.status(400).send());
}

exports.addUser     = addUser;
exports.signUp     = signUp;
exports.getUsers    = getUsers;
exports.getUser     = getUser;
exports.patchUser   = patchUser;
exports.deleteUser  = deleteUser;