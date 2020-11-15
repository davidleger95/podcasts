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
  max-width: 640px;
  margin: auto;
  padding: 2rem;

  h2 {
    font-size: clamp(3rem, 10vw, 5rem);
    margin: 0;
    text-align: center;
  }

  h3 {
    margin: 0;
    opacity: 0.6;
  }

  p {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
      'Open Sans', 'Helvetica Neue', sans-serif;
  }

  p:first-of-type {
    &::first-letter {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 3.75rem;
      display: block;
      float: left;
      margin-right: 0.15em;
      line-height: 1;
      margin-bottom: -0.25em;
    }
  }
`;

export const Section = styled.section<SectionProps>`
  ${ContentWrapper} {
    color: ${(p) => p.accentColor};
    background-color: ${(p) => p.primaryColor};

    p {
      color: ${(p) => p.textColor};
    }
  }
`;

export const SectionHeader = styled.header`
  text-align: center;
  display: grid;
  gap: 1rem;
  margin-bottom: 4rem;
`;

export const CoverImageWrapper = styled.div`
  height: clamp(10rem, calc(5rem + 60vmin), calc(5rem + 70vh));
  width: 100vw;
  overflow: hidden;
  position: sticky;
  top: 0;
  z-index: 0;
`;

export const CoverImage: typeof Image = styled(Image)`
  object-fit: cover;
  object-position: top;
`;

export const Artwork: typeof Image = styled(Image)`
  display: block;
  border-radius: 0.75rem;
`;

export const ArtworkWrapper = styled.div`
  margin: auto;
  width: clamp(8rem, 30vw, 12rem);
  margin-top: calc(-150px - 5vw);
  transform: rotateZ(7deg);
  margin-bottom: 3rem;
  filter: drop-shadow(0 0 1rem #0008);
`;
