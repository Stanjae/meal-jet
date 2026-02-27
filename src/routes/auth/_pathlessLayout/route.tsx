import { createFileRoute, Outlet } from '@tanstack/react-router';
import { Image } from '@mantine/core';
import hamburgerImg from '../../../assets/hamburger.jpg';

export const Route = createFileRoute('/auth/_pathlessLayout')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className=" h-dvh pt-27.5 px-8">
      <div className=" flex items-center gap-8 justify-center">
        <div className=" flex-1">
          <Image src={hamburgerImg} className=" rounded-lg" fit="cover" h={558} alt="Hamburger" />
        </div>

        <div className=" w-118.75">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
