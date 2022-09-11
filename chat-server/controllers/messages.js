const Message = require('../models/message');

const getChat = async (req, res) => {
    const myID = req.uid;
    const fromID = req.params.from;

    const last30 = await Message.find({
        $or: [
            {from: myID, to: fromID},
            {from: fromID, to: myID }
        ]
    })
    .sort({createdAt: 'asc'})
    .limit(30);

    res.json({
        ok: true,
        messages: last30
    })
}

module.exports = {
    getChat
}