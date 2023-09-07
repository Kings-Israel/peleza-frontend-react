import api from 'axios'
import { store } from 'store';
import { setCreditsAction } from 'store/actions/requests';
import { clearToken, getToken } from 'utils/auth.token';

// api.defaults.baseURL = 'https://dev.portal.pidva.africa/peleza-backend-server/api/' 
api.defaults.baseURL = process.env.NODE_ENV === 'development' ? `http://${window.location.hostname}:8000/peleza-backend-server/api/` : 'https://dev.portal.pidva.africa/peleza-backend-server/api/' 
// api.defaults.baseURL = process.env.NODE_ENV === 'development' ? `http://${window.location.hostname}:8000/peleza-backend-server/api/` : 'https://kyc.pidva.africa/peleza-backend-server/api/' 
api.defaults.headers.common['Authorization'] = 'Bearer ' + getToken();

api.interceptors.response.use(function (a) {
    try {
        const data = a.data['credits']
        if (String(data).toString() !== '' && data !== null && data !== undefined) store.dispatch(setCreditsAction(data))
    } finally {
        return Promise.resolve(a)
    }
}, (a) => {
    if (a && a.response && (a.response.status === 403 || !a.response.status)) {
        clearToken()
        return Promise.reject(a)
    }
    return Promise.reject(a)
})


export default api