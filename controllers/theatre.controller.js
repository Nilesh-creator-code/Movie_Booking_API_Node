const theatreService = require('../services/theatre.service');

const create = async (req, res) => {
  try {
    const response = await theatreService.createTheatre(req.body);

    return res.status(201).json({
      success: true,
      data: response
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      err: error.message
    });
  }
};

module.exports = { create };
