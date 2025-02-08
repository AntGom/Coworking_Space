import createSpaceModel from '../../models/spaces/createSpaceModel.js';
import newSpaceSchema from '../../schema/spaceSchema/newSpaceSchema.js';

const createSpaceController = async (req, res, next) => {
    try {
        await newSpaceSchema.validateAsync(req.body);
        const {
            nombre,
            descripcion,
            categoria_id,
            capacidad,
            precio_por_persona,
            precio_espacio_completo,
            direccion,
            estado,
            valoracion_media,
        } = req.body;

        if (
            !nombre ||
            !categoria_id ||
            !capacidad ||
            !precio_por_persona ||
            !precio_espacio_completo ||
            !direccion ||
            !estado
        ) {
            return res.status(400).json({ message: 'Faltan datos necesarios' });
        }

        //Llamamos al modelo para que realice la petición a la DB.
        const espacioId = await createSpaceModel({
            nombre,
            descripcion,
            categoria_id,
            capacidad,
            precio_por_persona,
            precio_espacio_completo,
            direccion,
            estado,
            valoracion_media,
        });

        res.status(201).send({
            status: 'ok',
            data: {
                id: espacioId,
                nombre,
                descripcion,
                categoria_id,
                capacidad,
                precio_por_persona,
                precio_espacio_completo,
                direccion,
                estado,
                valoracion_media,
            },
        });
        
    } catch (err) {
        next(err);
    }
};

export default createSpaceController;
