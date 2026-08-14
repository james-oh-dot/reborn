import {Composition} from 'remotion';
import {HeroParticleWave} from './HeroParticleWave';

export const RemotionRoot = () => {
  return (
    <Composition
      id="HeroParticleWave"
      component={HeroParticleWave}
      durationInFrames={240}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
