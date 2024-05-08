import axios from 'axios';

interface IFlagsmithClient {
    baseURL: string;
    apiKey: string;
}

class FlagsmithClient {
    private baseURL: string;
    private apiKey: string;

    constructor({ baseURL, apiKey }: IFlagsmithClient) {
        if (!baseURL || !apiKey) {
            throw new Error('Flagsmith client configuration is incomplete. Please check your environment settings.');
        }
        this.baseURL = baseURL;
        this.apiKey = apiKey;
    }

    async checkFeatureEnabled(identifier: string, feature: string): Promise<boolean> {
        const url = `${this.baseURL}?identifier=${identifier}&feature=${feature}`;
        try {
            const response = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Environment-Key': this.apiKey
                }
            });
            return !!response.data.enabled;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(`HTTP error! status: ${error.response?.status}`, error.message);
            } else {
                console.error('An unexpected error occurred:', error);
            }
            throw error;
        }
    }
}

export default FlagsmithClient;

//implementation
/*

const flagsmithClient = new FlagsmithClient({
    baseURL: import.meta.env.PUBLIC_FLAGSMITH_BASE_URL,
    apiKey: import.meta.env.PUBLIC_FLAGSMITH_API_KEY
});

let featureEnabled = false;
try {
    featureEnabled = await flagsmithClient.checkFeatureEnabled('92334', 'href_skoovify');
} catch (error) {
    console.error('Failed to check feature:', error);
}

*/