import { useState } from 'react';

interface ModalReturn {
  isShowing: boolean;
  toggle: () => void;
  show: () => void;
  hide: () => void;
}

export const useModal = (): ModalReturn => {
  const [isShowing, setIsShowing] = useState(false);
  const toggle = () => setIsShowing(prev => !prev);
  const show = () => setIsShowing(true);
  const hide = () => setIsShowing(false);

  return {
    isShowing,
    toggle,
    hide,
    show
  };
};
