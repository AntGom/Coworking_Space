import * as messagesModel from '../../models/incidents/index.js';

const getMessagesController = async (req, res) => {
    const { id } = req.params;

    try {
        const messages = await messagesModel.getMessagesModel(id);
        res.json(messages);
    } catch (error) {
        console.error('Error al obtener los mensajes:', error);
        res.status(500).json({ mensaje: 'Hubo un error al obtener los mensajes' });
    }
};

export default getMessagesController;