import jsonwebtoken from 'jsonwebtoken';

export function tokenValidate(request, response, next) {
    const token = request.cookies.authToken;

    if (!token) {
        return response.status(401).json({access: false, message: 'Access denied. No token provided.'});
    }

    try {
        const payload = jsonwebtoken.verify(token, process.env.JWT_ACCESS_SECRET);

        if (typeof payload !== 'object' || !payload.user) {
            return response.status(401).json({access: false, message: 'Invalid token. User not found in token.' });
        }

        request.headers['user'] = payload.user;
        return next();
    } catch (error) {
        console.error('Token verification error:', error.message);
        return response.status(401).json({access: false, message: 'Invalid token. Please log in again.' });
    }
}