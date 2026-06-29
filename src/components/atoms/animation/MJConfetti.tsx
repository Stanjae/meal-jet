import Confetti from 'react-confetti-boom';

type MJConfettiProps = {
  mode?: 'boom' | 'fall';
  particleCount?: number;
};
export default function MJConfetti({ mode = 'boom', particleCount = 50 }: MJConfettiProps) {
  return <Confetti mode={mode} particleCount={particleCount} />;
}
