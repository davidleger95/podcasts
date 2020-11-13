import React from 'react';
import data from 'content/podcasts.json';
import { Content, ContentWrapper, CoverImage, CoverImageWrapper, Section } from 'components/styled';

const AnyCoverImage = CoverImage as any;
const Podcasts = () => {
  return (
    <>
      {data.map(({ theme, coverImage, name, host, about, featuredEpisode }) => (
        <Section {...theme} key={name}>
          <CoverImageWrapper>
            <AnyCoverImage {...coverImage} layout="fill" />
          </CoverImageWrapper>
          <ContentWrapper>
            <Content>
              <h2>{name}</h2>
              <h3>{host}</h3>
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
