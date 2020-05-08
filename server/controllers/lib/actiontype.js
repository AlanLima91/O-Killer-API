const { ActionType } = require('../../schema/actiontypes');
const _              = require('lodash');
const { ObjectID }   = require('mongodb');


async function getActionTypes(req,res){
    try{
        const actiontype = await ActionType.find();
        res.status(200).send({actiontype});
    } catch (error) {
        res.status(400).send(error);
    }
}

async function postActionType(req,res){
    try{
	    var body = _.pick(req.body, ['name']);
        var actionType = new ActionType(body);

        const actiontype = await actionType.save();
        res.status(201).send(actiontype);
    } catch (error) {
        res.status(400).send(error);
    }
}

async function deleteActionType(req, res) {
    try {
        var id = req.params.id;
        if (!ObjectID.isValid(id)) return res.status(404).send();
        const actiontype = await ActionType.findByIdAndDelete(id);
        if (!actiontype)
            return res.status(404).send();
        res.status(204).send({actiontype});
    } catch (error) {
        res.status(400).send(error);
    }
}


async function getActionType(req,res) {
    try{
        var id = req.params.id;
        if (!ObjectID.isValid(id)) return res.status(404).send();
        const actiontype = await ActionType.findById(id);
        if (!actiontype) return res.status(404).send();
        res.status(200).send({actiontype});
    } catch (error) {
        res.status(400).send(error);
    }
}

async function patchActionType(req, res) {
    try{

        var id = req.params.id;
        var body = _.pick(req.body, ['name']);

        if (!ObjectID.isValid(id)) return res.status(400).send();
        ActionType.findByIdAndUpdate(id, {$set: body}, {new: true});

        if (!actionType) return res.status(404).send();
        res.status(200).send({actionType});
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.getActionTypes     = getActionTypes;
exports.postActionType     = postActionType;
exports.deleteActionType   = deleteActionType;
exports.getActionType      = getActionType;
exports.patchActionType    = patchActionType;