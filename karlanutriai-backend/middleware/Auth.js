import jsonwebtoken from 'jsonwebtoken';

export function tokenValidate(request, response, next) {
    const token = request.headers.authorization;

    if (!token) {
        return response.status(401).json({access: false, message: 'ACESSO NEGADO, token não encontrado'});
    }

    try {
        const payload = jsonwebtoken.verify(token, process.env.JWT_ACCESS_SECRET);
        if (typeof payload !== 'object') {
            return response.status(401).json({access: false, message: 'TOKEN INVÁLIDO' });
        }

        request.headers['userData'] = payload;
        return next();
    } catch (error) {
        return response.status(401).json({access: false, message: 'ERRO AO VERIFICAR TOKEN.' });
    }
}