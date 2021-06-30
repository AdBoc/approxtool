import { useState } from 'react';

interface ModalReturn {
  isShowing: boolean;
  toggle: () => void;
}

export const useModal = (): ModalReturn => {
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    setIsShowing(prev => !prev);
  }

  return {
    isShowing,
    toggle
  }
}
