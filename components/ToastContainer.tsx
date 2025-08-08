
import React from 'react';
import { useToast } from '../context/ToastContext';
import { CheckCircleIcon, ErrorIcon, InfoIcon, CloseIcon } from './icons';

const icons: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
  success: CheckCircleIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const toastStyles: { [key: string]: string } = {
  success: 'bg-teal-50 border-teal-500 text-teal-800',
  error: 'bg-rose-50 border-rose-500 text-rose-800',
  info: 'bg-sky-50 border-sky-500 text-sky-800',
};

const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (!toasts.length) return null;

  return (
    <div className="fixed top-5 right-5 z-[100] w-full max-w-sm space-y-3">
      {toasts.map((toast) => {
        const Icon = icons[toast.type];
        const style = toastStyles[toast.type];
        return (
          <div
            key={toast.id}
            className={`relative flex items-start p-4 border-l-4 rounded-lg shadow-lg animate-fade-in-right ${style}`}
            role="alert"
          >
            <div className="flex-shrink-0">
              <Icon className="h-6 w-6" />
            </div>
            <div className="ml-3 flex-1 pt-0.5 text-sm font-medium">
              {toast.message}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-4 -mr-1 -mt-1 flex-shrink-0 p-1 rounded-md opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              <span className="sr-only">Close</span>
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>
        );
      })}
      <style>{`
        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fade-in-right {
          animation: fade-in-right 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ToastContainer;
