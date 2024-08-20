const kartuAbsenService = require('../services/kartuAbsenService');

const getAllKartuAbsen = async (req, res) => {
    try {
        const kartuAbsen = await kartuAbsenService.getAllKartuAbsen();
        res.status(200).json(kartuAbsen); // Mengirimkan data kartu_absen
    } catch (error) {
        res.status(500).json({ error: error.message }); // Mengirimkan pesan error
    }
}
const getKartuAbsenById = async (req, res) => {
    try {
        const kartuAbsen = await kartuAbsenService.getKartuAbsenById(req.params.id);
        if (kartuAbsen) {
            res.status(200).json(kartuAbsen);
        } else {
            res.status(404).json({ message: 'Kartu Absen not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



const getKartuAbsenByNomorKartu = async (req, res) => {
    try {
        const nomorKartu = req.query.nomor_kartu; // Use query parameters
        const kartuAbsen = await kartuAbsenService.getKartuAbsenByNomorKartu(nomorKartu);

        if (kartuAbsen) {
            res.status(200).json(kartuAbsen);
        } else {
            res.status(404).json({ message: 'Kartu Absen not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getpulang = async (req, res) => {
    try {
        const nomorKartu = req.query.nomor_kartu; // Use query parameters
        if (!nomorKartu) {
            return res.status(400).json({ message: 'Nomor Kartu is required' });
        }

        const pulang = await kartuAbsenService.getpulang(nomorKartu);

        if (pulang) {
            res.status(200).json(pulang);
        } else {
            res.status(404).json({ message: 'Kartu Absen not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



const createKartuAbsen = async (req, res) => {
    try {
        const newKartuAbsen = await kartuAbsenService.createKartuAbsen(req.body);
        res.status(201).json(newKartuAbsen);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const updateKartuAbsen = async (req, res) => {
    try {
        const { nik, nomor_kartu } = req.body;
        await kartuAbsenService.updateKartuAbsen(nik, nomor_kartu);
        res.status(200).json({ message: 'Kartu absen updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteKartuAbsen = async (req, res) => {
    try {   
        const deleted = await kartuAbsenService.deleteKartuAbsen(req.params.id);
        if (deleted) {
            res.status(200).json({ message: 'Kartu Absen deleted' });
        } else {
            res.status(404).json({ message: 'Kartu Absen not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getDataByNomorKartu = async (req, res) => {
    try {
        const kartuAbsen = await kartuAbsenService.getDataByNomorKartu(req.query.nik); // Change from req.params to req.query
        if (kartuAbsen) {
            res.status(200).json(kartuAbsen);
        } else {
            res.status(404).json({ message: 'data karyawan tidak ditemukan' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    getAllKartuAbsen,
    getKartuAbsenById,
    getKartuAbsenByNomorKartu,
    getDataByNomorKartu,
    createKartuAbsen,
    updateKartuAbsen,
    deleteKartuAbsen,
    getpulang
};
