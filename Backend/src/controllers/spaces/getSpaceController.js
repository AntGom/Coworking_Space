import * as spaceModel from '../../models/spaces/index.js';
const getSpace = async (req, res, next) => {
    const spaceId = req.params.id;

    try {
        const space = await spaceModel.getSpaceById(spaceId);

        if (!space) {
            return res.status(404).send({
                status: 'error',
                message: 'Espacio no encontrado'
            });
        }

        res.send({
            status: 'ok',
            data: space,
        });
        
    } catch (err) {
        next(err);
    }
};


export default getSpace;
