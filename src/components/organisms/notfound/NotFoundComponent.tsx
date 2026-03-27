import { useRouter } from '@tanstack/react-router';
import MJButton from '@/components/atoms/buttons/MJButton';

type Props = {
  errorType: '404' | '500';
};

const errorMessages = {
  '404': {
    title: '404',
    message: 'The page you were looking for is not found!',
    description: 'You may have mistyped the address or the page may have moved.',
  },
  '500': {
    title: '500',
    message: 'Internal server error',
    description: 'Please try again later.',
  },
};

const NotFoundComponent = ({ errorType }: Props) => {
  const router = useRouter();
  return (
    <section className="bg-primary/20 h-screen flex justify-center items-center">
      <div className=" w-full max-w-lg">
        <h1 className="text-[131.25px] font-bold text-center text-[#3d4152]">
          {errorMessages[errorType].title}
        </h1>
        <h4 className="text-[35px] text-center font-bold text-[#3d4152]">
          {errorMessages[errorType].message}
        </h4>
        <p className="text-sm text-gray-400 text-center">{errorMessages[errorType].description}</p>

        <div className="flex justify-center mt-3">
          <MJButton
            onClick={() => router.history.back()}
            className="bg-primary rounded-md px-4 py-2 text-white"
          >
            Back to Home
          </MJButton>
        </div>
      </div>
    </section>
  );
};

export default NotFoundComponent;
