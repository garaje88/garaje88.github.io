import axios from 'axios';

interface Message {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

interface ChatGPTPayload {
    messages: Message[];
    model: string;
}

// Utilizar variables de entorno para configurar la API
const API_URL = import.meta.env.PUBLIC_OPENAI_API_BASE_URL; // URL por defecto
const API_KEY = import.meta.env.PUBLIC_OPENAI_API_KEY; // La clave API desde el archivo .env
const API_ORGANIZATION = import.meta.env.PUBLIC_OPENAI_API_ORGANIZATION; 
const API_MODEL = import.meta.env.PUBLIC_OPENAI_API_MODEL; 

// Función para crear el payload
export function createPayload(messages: Message[]): ChatGPTPayload {
    return {
        messages, model:API_MODEL
    };
}

// Función para consumir la API de ChatGPT
export async function callChatGPTAPI(payload: ChatGPTPayload): Promise<any> {
    if (!API_KEY) {
        throw new Error('API key is not defined. Please check your .env file.');
    }

    try {
        const response = await axios.post(API_URL, payload, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': API_KEY,
                'OpenAI-Organization': API_ORGANIZATION
            }
        });
        return response;
    } catch (error) {
        console.error('Error al llamar a la API de ChatGPT:', error);
        return null;
    }
}
