import axios from 'axios';

const FLAGSMITH_BASE_URL = import.meta.env.PUBLIC_FLAGSMITH_BASE_URL;
const PUBLIC_FLAGSMITH_API_KEY = import.meta.env.PUBLIC_FLAGSMITH_API_KEY;

export async function callFlagsId(identifier: string, feature: string): Promise<boolean> {
    if (!FLAGSMITH_BASE_URL) {
        throw new Error('API flagsmith url is not defined. Please check your .env file.');
    }
    if (!PUBLIC_FLAGSMITH_API_KEY) {
        throw new Error('API flagsmith key is not defined. Please check your .env file.');
    }

    const url = `${FLAGSMITH_BASE_URL}?identifier=${identifier}&feature=${feature}`;

    try {
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'X-Environment-Key': PUBLIC_FLAGSMITH_API_KEY
            }
        });
        
        return !!response.data.enabled;
    } catch (error) {
        // Mejor manejo de errores diferenciando entre errores de HTTP y otros tipos de errores
        if (axios.isAxiosError(error)) {
            // Error de Axios, probablemente un error de HTTP
            console.error(`HTTP error! status: ${error.response?.status}`, error.message);
        } else {
            // Otro tipo de error
            console.error('An unexpected error occurred:', error);
        }
        // Lanzar un error para ser manejado por el consumidor de la función
        throw error;
    }
}
