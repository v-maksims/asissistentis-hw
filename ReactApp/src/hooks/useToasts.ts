import { toast, ToastPosition } from 'react-toastify';

export default function useToasts () {
    const toastSuccesHandler = (text: string, time: number, pos: ToastPosition) => {
        toast.success(text, {
            position: pos,
            autoClose: time,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
    };

    const toastErrorHandler = (text: string, time: number, pos: ToastPosition) => {
        toast.error(text, {
            position: pos,
            autoClose: time,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
    };
    const toastWarningHandler = (text: string, time: number, pos: ToastPosition) => {
        toast.warn(text, {
            position: pos,
            autoClose: time,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
    };

    return {
        toastSuccesHandler,
        toastErrorHandler,
        toastWarningHandler,
    };
}
