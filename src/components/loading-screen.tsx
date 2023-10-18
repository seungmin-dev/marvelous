import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const stroke = keyframes`
  0% {
		fill: rgba(72,138,20,0); stroke: rgba(255, 56, 62,1);
		stroke-dashoffset: 25%; stroke-dasharray: 0 50%; stroke-width: 2;
	}
	70%  {fill: rgba(72,138,20,0); stroke: rgba(255, 56, 62,1); }
	80%  {fill: rgba(72,138,20,0); stroke: rgba(255, 56, 62,1); stroke-width: 3; }
	100% {
		fill: rgba(239, 21, 28,1); stroke: rgba(255, 56, 62,0); 
		stroke-dashoffset: -25%; stroke-dasharray: 50% 0; stroke-width: 0;
	}`;
const SvgWrapper = styled.div`
  width: 300px;
`;
const Svg = styled.svg`
  text-transform: uppercase;
  animation: stroke 5s infinite alternate;
  stroke-width: 2;
  stroke: #ef151e;
  font-size: 60px;
  animation: ${stroke} 3s ease infinite;
`;

export const LoadingScreen = () => {
  return (
    <Wrapper>
      <SvgWrapper>
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-28.6146 -55.69225 247.9932 334.1535"
        >
          <path d="M91.256 43.595c-42.332 2.172-75.995 37.577-75.995 80.931 0 14.627 3.832 28.349 10.535 40.195l-8.118 15.765C6.548 164.704 0 145.388 0 124.526c0-53.278 42.704-96.473 95.382-96.473.753 0 1.504.009 2.252.026L111.412 0h29.434v39.696c29.733 16.337 49.918 48.2 49.918 84.829 0 53.279-42.704 96.473-95.382 96.473-16.079 0-31.229-4.024-44.519-11.132l6.712-13.875c11.262 6.107 24.134 9.571 37.807 9.571 44.249 0 80.121-36.282 80.121-81.037 0-27.971-14.013-52.633-35.325-67.197v76.695l-26.897-25.442V50.453l-33.218 78.891h33.218V116.68l31.141 29.274-32.179 24.705V157.58H68.437l-28.855 65.189-35.708-.699z" />
          <path d="M140.125 179.637H112.21l27.915-23.914z" />
        </Svg>
      </SvgWrapper>
    </Wrapper>
  );
};
