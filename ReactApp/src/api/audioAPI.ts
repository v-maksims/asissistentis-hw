import axios from 'axios';

export default function audioAPI () {
    const dbURL = 'http://localhost:3004';
    axios.defaults.baseURL = dbURL;

    const addAudio = (formData:FormData) => axios.post('/upload-audio', formData);

    const getAudio = () => axios.get<string[]>('/all-audio');

    return {
        addAudio,
        getAudio,
    };
}
