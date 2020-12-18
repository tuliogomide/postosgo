var jwt = require('jsonwebtoken');

exports.authenticateJWT = function (req, res, next) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, 'fbbdf33639da90cc80adf56732c41cb30772b61c', (err, decoded) => {
            if (err) {
               return res.status(401).json({ erro: true, mensagem: err.message });
            }

            next();
        });
    } else {
       return res.status(401).json({ erro: true, mensagem: 'Token é requerido' });
    }
};