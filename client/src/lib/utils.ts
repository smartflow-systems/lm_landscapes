import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0 &&
    rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
    rect.right >= 0
  );
}

export function initializeBeforeAfterSlider(slider: HTMLElement): void {
  const handle = slider.querySelector('.slider-handle') as HTMLElement;
  const beforeImage = slider.querySelector('.before-image') as HTMLElement;
  
  if (!handle || !beforeImage) return;
  
  let isDragging = false;
  
  const move = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    
    const sliderRect = slider.getBoundingClientRect();
    const x = 'touches' in e
      ? e.touches[0].clientX - sliderRect.left
      : (e as MouseEvent).clientX - sliderRect.left;
    
    const position = Math.max(0, Math.min(1, x / sliderRect.width));
    const percentage = position * 100;
    
    beforeImage.style.width = `${percentage}%`;
    handle.style.left = `${percentage}%`;
  };
  
  const startDrag = () => { isDragging = true; };
  const endDrag = () => { isDragging = false; };
  
  // Mouse events
  handle.addEventListener('mousedown', startDrag);
  window.addEventListener('mouseup', endDrag);
  window.addEventListener('mousemove', move as (e: MouseEvent) => void);
  
  // Touch events
  handle.addEventListener('touchstart', startDrag);
  window.addEventListener('touchend', endDrag);
  window.addEventListener('touchmove', move as (e: TouchEvent) => void);
}

export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const re = /^(\+?\d{1,3}[- ]?)?\d{10,14}$/;
  return re.test(phone.replace(/\s+/g, ''));
};
