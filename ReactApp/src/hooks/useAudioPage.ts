import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '../main';
import audioAPI from '../api/audioAPI';
import useToasts from '../hooks/useToasts';

export default function useAudioPage () {
    const [player, setPlayer] = useState(false);
    const [fileName, setFileName] = useState('');

    const { getAudio, addAudio } = audioAPI();
    const { data, isLoading: allAudio } = useQuery({
        queryKey: ['audio'],
        queryFn: getAudio,
    });

    const { toastErrorHandler, toastSuccesHandler } = useToasts();

    const { mutate, isLoading: newAudioLoad } = useMutation({
        mutationFn: addAudio,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['audio'] });
            setFileName('');
            toastSuccesHandler('Audio loaded!', 2000, 'top-right');
        },
        onError: () => toastErrorHandler('Some went wrong!', 3000, 'top-right'),
    });

    const inputFileHandler = (name: string) => {
        setFileName(name);
    };

    const playerHandler = () => {
        setPlayer(!player);
    };

    return {
        allAudio,
        newAudioLoad,
        data,
        mutate,
        fileName,
        inputFileHandler,
        player,
        playerHandler,
    };
}
