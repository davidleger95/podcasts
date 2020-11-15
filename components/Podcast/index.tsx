import React from 'react';
import data from 'content/podcasts.json';
import {
  Artwork,
  ArtworkWrapper,
  Content,
  ContentWrapper,
  CoverImage,
  CoverImageWrapper,
  Section,
  SectionHeader
} from 'components/styled';
import Wave from 'assets/wave.svg';
import styled from 'styled-components';

const StyledWave = styled(Wave)<{ color: string }>`
  color: ${(p) => p.primaryColor};
  width: 100%;
  z-index: 1000;
  transform: translateY(calc(-100% + 1px - 5vw));
  margin-top: 5vw;
  margin-bottom: -12vw;

  @media (max-width: 600px) {
    transform: translateY(calc(-100% + 1px - 5vw)) scaleY(2);
    transform-origin: bottom;
  }

  @keyframes amplify {
    0% {
      transform: scaleY(0.75);
    }
    25% {
      transform: scaleY(0.6);
    }
    50% {
      transform: scaleY(0.8);
    }
    75% {
      transform: scaleY(0.6);
    }
    100% {
      transform: scaleY(1);
    }
  }

  path {
    transform-origin: bottom;
    animation: amplify 11s ease-in-out infinite alternate;

    &:nth-child(1) {
      animation-delay: -2s;
      animation-duration: 7s;
    }
    &:nth-child(2) {
      animation-delay: -4s;
      animation-duration: 9s;
    }
  }
`;

const Podcasts = () => {
  return (
    <>
      {data.map(({ theme, coverImage, artwork, name, host, about, featuredEpisode }) => (
        <Section {...theme} key={name}>
          <CoverImageWrapper>
            <CoverImage {...coverImage} layout="fill" />
          </CoverImageWrapper>
          <ContentWrapper>
            <StyledWave color={theme.primaryColor} />
            <Content>
              <SectionHeader>
                <ArtworkWrapper>
                  <Artwork src={artwork} width={200} height={200} layout="responsive" />
                </ArtworkWrapper>
                <h2>{name}</h2>
                <h3>{host}</h3>
              </SectionHeader>
              <div dangerouslySetInnerHTML={{ __html: about }} />
              <iframe
                src={`https://open.spotify.com/embed-podcast/episode/${featuredEpisode.id}`}
                width="100%"
                frameBorder="0"
                allow="encrypted-media"></iframe>
            </Content>
          </ContentWrapper>
        </Section>
      ))}
    </>
  );
};

export default Podcasts;
