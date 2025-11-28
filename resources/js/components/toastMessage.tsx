// components/ToastMessage.tsx
import { useEffect } from "react";
import { toast } from "sonner";

interface ToastMessageProps {
    message: string;
    show: boolean;
}

export default function ToastMessage({ message, show }: ToastMessageProps) {
    useEffect(() => {
        if (show) {
            toast.success(message);
        }
    }, [show, message]);

    return null; // no UI needed

}