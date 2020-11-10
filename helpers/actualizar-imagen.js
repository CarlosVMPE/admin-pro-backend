const fs = require('fs');
const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const borrarImagen = (path) => {
    // Borrar la imagén anterior

    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
}

const actualizarImagen = async (tipo, id, nombreArchivo) => {

    let pathViejo = '';
    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico) {
                console.log('No es un médico por id');
                return false;
            }

            pathViejo = `./uploads/medicos/${medico.img}`;
            borrarImagen(pathViejo);


            medico.img = nombreArchivo;
            await medico.save();
            return true;

        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                console.log('No es un hospital por id');
                return false;
            }

            pathViejo = `./uploads/hospitales/${hospital.img}`;
            borrarImagen(pathViejo);


            hospital.img = nombreArchivo;
            await hospital.save();
            return true;

        case 'usuarios':
            const usuarios = await Usuario.findById(id);
            if (!usuarios) {
                console.log('No es un usuario por id');
                return false;
            }

            pathViejo = `./uploads/usuarios/${usuarios.img}`;
            borrarImagen(pathViejo);


            usuarios.img = nombreArchivo;
            await usuarios.save();
            return true;

        default:
            break;
    }
}

module.exports = {
    actualizarImagen
}