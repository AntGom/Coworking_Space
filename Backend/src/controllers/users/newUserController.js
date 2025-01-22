import randomstring from 'randomstring'; 
import validateSchema from '../../utils/validateSchema.js';
import newUserSchema from '../../schema/user/newUserSchema.js';
import sendMailUtil from '../../utils/sendMailUtils.js';
import * as userModel from '../../models/users/index.js';

const newUserController = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        // -> Validamos body con Joi.
        await validateSchema(newUserSchema, req.body);

        const registrationCode = randomstring.generate(30);
        const activationUrl = process.env.NODE_ENV === 'production'
    ? `${process.env.CLIENT_URL}/auth/activate`  //En producción
    : `${process.env.CLIENT_URL_LOCAL}/auth/activate`;  //En local

        const emailSubject = 'Activación Cuenta Espacios Coworking';
        const emailBody = `
    ¡Hola, ${username}!

    Bienvenido a Coworking Space!!
    Éste es tu código de registro: 
        <strong> ${registrationCode} </strong>

    Usa el siguiente enlace para activar tu cuenta:
        <a href="${activationUrl}">Activa tu Cuenta</a>
          `;

        await userModel.insertUser(username, email, password, registrationCode);

        // -> Ya se ha guardado el user en la DB (lo ha hecho el modelo). Ahora enviamos correo con el registrationCode.
        await sendMailUtil(email, emailSubject, emailBody);

        // -> Una vez enviado el correo con el registrationCode mandamos respuesta al cliente.
        res.send({
            status: 'ok',
            message:
                'Usuario creado correctamente. Por favor revisa tu correo.',
        });
    } catch (err) {
        next(err);
    }
};

export default newUserController;
