type WaveDividerProps = {
  position: 'top' | 'bottom';
  color: 'primary' | 'secondary';
};

const WaveDivider = ({ position, color }: WaveDividerProps) => {
  const colorClass = color === 'primary' ? 'wave-divider-primary' : 'wave-divider-secondary';
  const positionClass = position === 'bottom' ? 'wave-divider-bottom' : 'wave-divider-top';

  return (
    <div className={`wave-divider ${colorClass} ${positionClass}`}></div>
  );
};

export default WaveDivider;
