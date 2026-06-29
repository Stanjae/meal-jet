import { Divider } from '@mantine/core';
import BikeRider from '../../../assets/rider.png';

const BikeOnRoad = () => {
  return (
    <div className="road hidden md:block">
      <Divider variant="dashed" className="absolute top-1/2 w-full bg-primary" />
      <section className="relative w-75 animate-moveBike">
        <div className="smoke-animation absolute bottom-16 left-0" />
        <img className="w-75" src={BikeRider} alt="Bike on road" />
      </section>
    </div>
  );
};

export default BikeOnRoad;
