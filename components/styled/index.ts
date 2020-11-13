import styled from 'styled-components';
import Image from 'next/image';

interface SectionProps {
  primaryColor: string;
  accentColor: string;
  textColor: string;
}

export const ContentWrapper = styled.div`
  width: 100%;
  z-index: 10;
  position: relative;
`;
export const Content = styled.div`
  max-width: 1000px;
  margin: auto;
  padding: 2rem;

  h2 {
    font-size: 5rem;
    margin: 0;
  }

  p {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
      'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

export const Section = styled.section<SectionProps>`
  ${ContentWrapper} {
    color: ${(p) => p.accentColor};
    background-color: ${(p) => p.primaryColor};
  }
`;

export const CoverImageWrapper = styled.div`
  height: clamp(10rem, 60vmin, 70vh);
  width: 100vw;
  overflow: hidden;
  position: sticky;
  top: 0;
  z-index: 0;
`;

export const CoverImage = styled(Image)`
  object-fit: cover;
  object-position: top;
`;
