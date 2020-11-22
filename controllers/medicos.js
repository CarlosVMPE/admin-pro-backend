const { response } = require("express");
const Medico = require('../models/medico');

const getMedicos = async (req, res = response) => {

    const desde = Number(req.query.desde) || 0;

    /* const medicos = await Medico.find()
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre img') */

    const [medicos, total] = await Promise.all([
        Medico
            .find({}, 'usuario hospital nombre img')
            .populate('usuario', 'nombre img')
            .populate('hospital', 'nombre img')
            .skip(desde)
            .limit(5),

        Medico.countDocuments()
    ]);

    res.json({
        ok: true,
        medicos,
        total
    })
}

const getMedicosById = async (req, res = response) => {

    const id = req.params.id; // Id medico




    try {
        const medicos = await Medico.findById(id)
            .populate('usuario', 'nombre img')
            .populate('hospital', 'nombre img')

        res.json({
            ok: true,
            medicos
        })
    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const crearMedico = async (req, res = response) => {
    const uid = req.uid;
    const medicoIns = new Medico({
        usuario: uid,
        ...req.body
    });

    try {

        const medico = await medicoIns.save();

        res.json({
            ok: true,
            medico
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const actualizarMedico = async (req, res = response) => {
    const id = req.params.id; // Id medico
    const uid = req.uid; // Id user

    try {

        const medico = await Medico.findById(id);

        if (!medico) {
            return res.status(404).json({
                ok: false,
                msg: 'Médico no encontrado por id'
            })
        }

        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true });

        res.json({
            ok: true,
            medico: medicoActualizado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const borrarMedico = async (req, res = response) => {
    const id = req.params.id;

    try {

        const medico = await Medico.findById(id);

        if (!medico) {
            return res.status(404).json({
                ok: false,
                msg: 'Médico no encontrado por id'
            })
        }

        await Medico.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Médico eliminado'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
    getMedicosById
}