import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '../main';
import audioAPI from '../api/audioAPI';
import useToasts from '../hooks/useToasts';

export default function useAudioPage () {
    const [fileName, setFileName] = useState('');
    const { toastErrorHandler, toastSuccesHandler } = useToasts();

    const { getAudio, addAudio } = audioAPI();

    const { data, isLoading: allAudioLoading } = useQuery({
        queryKey: ['audio'],
        queryFn: getAudio,
    });

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

    return {
        allAudioLoading,
        newAudioLoad,
        data,
        mutate,
        fileName,
        inputFileHandler,
    };
}
