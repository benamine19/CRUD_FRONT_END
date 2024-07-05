import api from './index';
import {jwtDecode} from 'jwt-decode';
const verifyAndDecodeToken = async (token) => {
    try {
        // Envoyer le token dans le corps de la requête ou en tant qu'en-tête
        const response = await api.post('/user/verifytoken', { token });
        if (response.data.message === 'Token is valid') {
            const decodedToken = jwtDecode(token);
            return decodedToken;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error verifying token:', error);
        return null;
    }
};

export default verifyAndDecodeToken;
