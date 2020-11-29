import Head from 'next/head';
import Image from 'next/image';
import { FC, useRef } from 'react';
import styled from 'styled-components';
import { motion, useTransform, useViewportScroll, Variants } from 'framer-motion';
import styles from '../styles/Home.module.css';
import useWindowSize from 'hooks/useWindowSize';
import Podcasts from 'components/Podcast';
import Player from 'components/Player';

const Header = styled.header`
  display: grid;
  gap: 2rem;
  align-items: center;
  justify-items: center;
  min-height: 100vh;
  width: 100%;
  padding: 1rem;
  overflow: hidden;
`;

const Title = styled(motion.h1)`
  font-size: clamp(4rem, 12vmin, 6rem);
  display: grid;
  margin: 0;
  line-height: 1;
  color: #873dc1;
  letter-spacing: 0.025em;

  small {
    font-size: 0.4em;
    color: #000;

    &:last-of-type {
      justify-self: end;
    }
  }
`;

const GradientText = styled(motion.div)`
  color: transparent;
  background: linear-gradient(20deg, #a72db1, #873dff);
  -webkit-background-clip: text;
  background-clip: text;
  animation: hue 7s linear infinite alternate;

  @keyframes hue {
    0% {
      filter: hue-rotate(-10deg);
    }
    100% {
      filter: hue-rotate(10deg);
    }
  }
`;

const Author = styled(motion.div)`
  display: grid;
  gap: 1rem;
  align-self: start;
  justify-items: center;
  padding: 1rem;

  p {
    font-size: 0.8rem;
    opacity: 0.5;
    margin: 0;
  }
`;

const Logo = styled.img`
  height: 2rem;
`;

const CoverArtContainer = styled(motion.div)`
  display: flex;
  justify-content: space-around;
  grid-auto-flow: column;
  width: 100%;
  max-width: 1000px;
  margin: 2rem;
`;

const CoverArtWrapper = styled(motion.div)`
  display: block;
  height: clamp(4rem, 15vmin, 8rem);
  width: clamp(4rem, 15vmin, 8rem);

  > div {
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 0 2rem -1rem #000;
  }

  &:nth-child(even) > div {
    transform: rotateZ(7deg);
  }

  &:nth-child(odd) > div {
    transform: rotateZ(-7deg);
  }

  img {
    pointer-events: none;
  }
`;

const list: Variants = {
  visible: (i = 0) => ({
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.3,
      delay: i
    }
  }),
  hidden: {
    opacity: 0,
    transition: {
      when: 'afterChildren'
    }
  }
};

const item: Variants = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -100 }
};

const CoverArt: FC<any> = ({ delay = 0, dragConstraints, ...props }) => (
  <CoverArtWrapper
    drag
    dragConstraints={dragConstraints}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    variants={item}>
    {/* TODO move to keyframes */}
    {/* <motion.div
      animate={{
        rotate: [5 + delay, -5 + delay, 5 + delay],
        x: [5, -5, 5],
        y: [5 + delay, -5 + delay, 5 + delay]
      }}
      transition={{
        duration: 5 + delay,
        loop: Infinity,
        delay: delay * 2,
        type: 'keyframes'
      }}
      > */}
    <Image height={140} width={140} {...props} />
    {/* </motion.div> */}
  </CoverArtWrapper>
);

const percentOf = (value: number, max): number => (value / 100) * max;

export default function Home() {
  const constraintRef = useRef(null);
  const { scrollY } = useViewportScroll();
  const { height } = useWindowSize();

  const yPosAnim = useTransform(
    scrollY,
    [percentOf(15, height), percentOf(75, height)],
    [0, -1000]
  );
  const xPosAnim = useTransform(scrollY, [percentOf(20, height), percentOf(65, height)], [0, 1000]);
  const scale = useTransform(scrollY, [percentOf(20, height), percentOf(65, height)], [1, 3]);
  const opacity = useTransform(scrollY, [percentOf(50, height), percentOf(75, height)], [1, 0]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Some Podcasts I Listen To</title>
        {/* <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sansita+Swashed&display=swap"
          rel="stylesheet"></link> */}
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bangers&display=swap"
          rel="stylesheet"></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bangers&family=Luckiest+Guy&display=swap"
          rel="stylesheet"></link>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header ref={constraintRef}>
        <CoverArtContainer initial="hidden" animate="visible" variants={list} custom={0.25}>
          <CoverArt src="/review-revue.jpeg" dragConstraints={constraintRef} delay={0.5} />
          <CoverArt src="/reply-all.jpg" dragConstraints={constraintRef} />
          <CoverArt src="/potterless.jpg" dragConstraints={constraintRef} delay={0.25} />
          <CoverArt src="/cautionary-tales.png" dragConstraints={constraintRef} delay={0.75} />
        </CoverArtContainer>

        <Title initial="hidden" animate="visible" variants={list} custom={2}>
          <motion.small variants={item}>
            <motion.div style={{ x: yPosAnim, scale, opacity }}>Some</motion.div>
          </motion.small>
          <motion.span variants={item}>
            <GradientText style={{ y: yPosAnim, scale, opacity }}>Podcasts</GradientText>
          </motion.span>
          <motion.small variants={item}>
            <motion.div style={{ x: xPosAnim, scale, opacity }}>I Listen To</motion.div>
          </motion.small>
        </Title>
        <CoverArtContainer
          initial="hidden"
          animate="visible"
          variants={list}
          custom={1}
          style={{ opacity }}>
          <CoverArt src="/anthropocene-reviewed.png" dragConstraints={constraintRef} delay={0.75} />
          <CoverArt src="/s-town.jpg" dragConstraints={constraintRef} delay={0.25} />
          <CoverArt src="/how-i-built-this.png" dragConstraints={constraintRef} delay={0.5} />
          <CoverArt src="/the-last-archive.png" dragConstraints={constraintRef} />
        </CoverArtContainer>
        <Author initial="hidden" animate="visible" variants={list} custom={3}>
          <code style={{ fontStyle: 'italic' }}>
            made with <span style={{ color: 'hotpink' }}>&#10084;</span> by
          </code>
          <Logo src="/davejs-logo.svg" alt="dave.js" />
        </Author>
      </Header>
      <Podcasts />
      <Player audio={{ title: 'Riverside', src: '/agnes-obel--riverside.mp3' }} />
    </div>
  );
}
