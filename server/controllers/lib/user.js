const { User }     = require('../../schema/users');
const _            = require('lodash');
const { ObjectID } = require('mongodb');

function signUp(req, res)
{
    var body = _.pick(req.body, ['username', 'alive', 'password', 'tags']);
    var user = new User(body);

    user.save().then(doc => {
        res.status(200).send(doc);
    }).catch(err => {
        res.status(400).send(err);
    })
}

function getUsers(req, res)
{
    User.find().then(users => {
        res.status(200).send({users});
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
      res.status(200).send({user});
    }).catch(err => {
      res.status(400).send(err);
    })
}

function patchUsers(req, res)
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

function deleteUsers(req, res)
{
    var id = req.params.id;
    if (!ObjectID.isValid(id))
      return res.status(404).send();
    User.findByIdAndDelete(id).then(user => {
      if (!user)
        return res.status(404).send();
      res.status(200).send({user});
    }).catch(err => res.status(400).send());
}

exports.signUp      = signUp;
exports.getUsers    = getUsers;
exports.getUser     = getUser;
exports.patchUsers  = patchUsers;
exports.deleteUsers = deleteUsers;