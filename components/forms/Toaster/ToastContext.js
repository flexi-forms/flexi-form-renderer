import { createContext, useContext, useState, useEffect } from 'react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastMessage = ({ message, variant }) => {
  const { hideToast } = useToast();

  return (
    <div className="fixed bottom-5 right-5">
      <div
        id="toast-default"
        className={`flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 ${
          variant === 'success'
            ? 'bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200'
            : variant === 'warning'
            ? 'bg-yellow-100 text-yellow-500 dark:bg-yellow-800 dark:text-yellow-200'
            : variant === 'error'
            ? 'bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200'
            : 'bg-blue-100 text-blue-500 dark:bg-blue-800 dark:text-blue-200'
        }`}
        role="alert"
      >
        <div className="ms-3 text-sm font-normal pr-[15px]">{message}</div>
        <button
          type="button"
          className="ms-auto -mx-1.5 -my-1.5 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex items-center justify-center h-8 w-8"
          onClick={hideToast}
          aria-label="Close"
        >
          <span className="sr-only">Close</span>
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    message: '',
    variant: '',
    visible: false,
  });

  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => {
        setToast(prev => ({ ...prev, visible: false }));
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [toast.visible]);

  const showToast = (message, variant) => {
    setToast({ message, variant, visible: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, visible: false }));
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {toast.visible && <ToastMessage message={toast.message} variant={toast.variant} />}
    </ToastContext.Provider>
  );
};
