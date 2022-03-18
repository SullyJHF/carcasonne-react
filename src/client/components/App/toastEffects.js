import { useEffect } from 'react';
import { toast } from 'react-toastify';

export const TOAST_SUCCESS = 'TOAST_SUCCESS';
export const TOAST_ERROR = 'TOAST_ERROR';
export const TOAST_INFO = 'TOAST_INFO';

const TOAST_TYPES = {
  [TOAST_ERROR]: (msg) => toast.error(msg),
  [TOAST_SUCCESS]: (msg) => toast.success(msg),
  [TOAST_INFO]: (msg) => toast.info(msg),
};

export const useToastEffect = (stateValue, type = TOAST_INFO) => {
  useEffect(() => {
    TOAST_TYPES[type](stateValue);
  }, [stateValue]);
};
