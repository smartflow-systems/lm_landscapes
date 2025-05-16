import { useEffect, useRef } from 'react';

const LeafAnimation = () => {
  const leavesContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const leavesContainer = leavesContainerRef.current;
    if (!leavesContainer) return;
    
    const createLeaf = () => {
      const leaf = document.createElement('div');
      leaf.classList.add('leaf');
      leaf.style.left = `${Math.random() * 100}%`;
      leaf.style.animationDuration = `${10 + Math.random() * 20}s`;
      leaf.style.animationDelay = `${Math.random() * 5}s`;
      
      leavesContainer.appendChild(leaf);
      
      // Remove leaf after animation completes
      setTimeout(() => {
        if (leaf.parentNode === leavesContainer) {
          leavesContainer.removeChild(leaf);
        }
      }, 30000);
    };
    
    // Create initial leaves
    for (let i = 0; i < 10; i++) {
      createLeaf();
    }
    
    // Add new leaves periodically
    const interval = setInterval(createLeaf, 3000);
    
    return () => {
      clearInterval(interval);
      
      // Clean up any existing leaves
      while (leavesContainer.firstChild) {
        leavesContainer.removeChild(leavesContainer.firstChild);
      }
    };
  }, []);
  
  return <div ref={leavesContainerRef} id="leaves-container" className="absolute inset-0"></div>;
};

export default LeafAnimation;
