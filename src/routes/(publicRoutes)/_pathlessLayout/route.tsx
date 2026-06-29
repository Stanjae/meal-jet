import { createFileRoute, Outlet } from '@tanstack/react-router';
import { MJFooter } from '@/components/organisms/footer/MJFooter';
import MealjetNavbar from '@/components/organisms/navbar/MealjetNavbar';

export const Route = createFileRoute('/(publicRoutes)/_pathlessLayout')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main>
      <MealjetNavbar />
      <section>
        <Outlet />
      </section>
      <MJFooter />
    </main>
  );
}
