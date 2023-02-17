import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '../main';
import audioAPI from '../api/audioAPI';
import useToasts from '../hooks/useToasts';

export default function useAudioPage () {
    const [fileCount, setFileCount] = useState(0);
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
            setFileCount(0);
            toastSuccesHandler('Audio loaded!', 2000, 'top-right');
        },
        onError: () => toastErrorHandler('Some went wrong!', 3000, 'top-right'),
    });

    const inputFileHandler = (count: number) => {
        setFileCount(count);
    };

    return {
        allAudioLoading,
        newAudioLoad,
        data,
        mutate,
        fileCount,
        inputFileHandler,
    };
}
