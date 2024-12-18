import { useEffect, useState } from 'react';
import styled from 'styled-components';

// Loader Component
const Loader = ({ size = 24, color = '#f3f3f3' }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <StyledWrapper size={size} color={color} role="status" aria-label="Loading">
      <div className="honeycomb">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </StyledWrapper>
  );
};

interface StyledWrapperProps {
  size: number;
  color: string;
}

const StyledWrapper = styled.div<StyledWrapperProps>`
  .honeycomb {
    height: ${({ size }) => size}px;
    width: ${({ size }) => size}px;
    position: relative;
  }

  .honeycomb div {
    animation: honeycomb 2.1s infinite backwards;
    background: ${({ color }) => color};
    height: ${({ size }) => size / 2}px;
    width: ${({ size }) => size}px;
    margin-top: ${({ size }) => size / 4}px;
    position: absolute;
  }

  .honeycomb div:after,
  .honeycomb div:before {
    border-left: ${({ size }) => size / 2}px solid transparent;
    border-right: ${({ size }) => size / 2}px solid transparent;
    content: '';
    position: absolute;
    left: 0;
    right: 0;
  }

  .honeycomb div:after {
    top: ${({ size }) => -size / 4}px;
    border-bottom: ${({ size }) => size / 4}px solid ${({ color }) => color};
  }

  .honeycomb div:before {
    bottom: ${({ size }) => -size / 4}px;
    border-top: ${({ size }) => size / 4}px solid ${({ color }) => color};
  }

  .honeycomb div:nth-child(1) { animation-delay: 0s; left: -28px; top: 0; }
  .honeycomb div:nth-child(2) { animation-delay: 0.08s; left: -14px; top: 22px; }
  .honeycomb div:nth-child(3) { animation-delay: 0.16s; left: 14px; top: 22px; }
  .honeycomb div:nth-child(4) { animation-delay: 0.24s; left: 28px; top: 0; }
  .honeycomb div:nth-child(5) { animation-delay: 0.32s; left: 14px; top: -22px; }
  .honeycomb div:nth-child(6) { animation-delay: 0.4s; left: -14px; top: -22px; }
  .honeycomb div:nth-child(7) { animation-delay: 0.48s; left: 0; top: 0; }

  @keyframes honeycomb {
    0%, 20%, 80%, 100% {
      opacity: 0;
      transform: scale(0);
    }
    30%, 70% {
      opacity: 1;
      transform: scale(1);
    }
  }
`;
export default Loader;