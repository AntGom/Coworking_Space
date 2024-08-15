const joiErrorMessages = {
    'any.required': 'El campo "{#key}" es requerido',
    'string.base': 'El valor de "{#key}" debe ser una cadena',
    'string.empty': 'El campo "{#key}" no debe estar vacío',
    'number.base': 'El valor de "{#key}" debe ser un número',
    'number.max': 'Los valores deben estar entre 1 y 5',
    'object.base': 'El valor de "{#key}" debe ser un objeto',
    'any.only': 'Solo se permiten fotos jpeg o png',
    'string.email':
        'Debe proporcionar un correo electrónico válido para "{#key}"',
    'string.pattern.base':
        'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un símbolo de puntuación para "{#key}"',
    'string.min': 'El campo "{#key}" debe tener al menos {#limit} caracteres',
    'string.max': 'El campo "{#key}" no debe exceder los {#limit} caracteres',
    'object.unknown': 'No se permiten campos adicionales en este objeto',
    'date.base': 'El campo debe ser una fecha válida',
    'date.min': 'No se permiten fechas anteriores a la fecha actual',
};

export default joiErrorMessages;
