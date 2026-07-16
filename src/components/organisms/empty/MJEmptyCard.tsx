import MJButton from '@/components/atoms/buttons/MJButton';
import type { TEmptyStateConfig } from '@/lib/types';

type Props = {
  emptyState: TEmptyStateConfig | undefined;
  btnText?: string;
  btnClickHandler?: () => void;
  btnText2?: string;
  btnClickHandler2?: () => void;
  wrapperClassName?: string;
};

const MJEmptyCard = ({
  emptyState,
  wrapperClassName,
  btnText,
  btnClickHandler,
  btnText2,
  btnClickHandler2,
}: Props) => {
  const { title, description, imageUrl } = emptyState || {};

  return (
    <section className={wrapperClassName}>
      <div className="flex items-center justify-center py-5">
        <section className="w-full max-w-md space-y-2.5">
          <img className="w-30 h-25.25 mx-auto block " src={imageUrl} alt={title} />
          <h2 className="text-center text-xl font-semibold capitalize">{title}</h2>
          <p className="text-center text-sm mb-3 text-gray-400">{description}</p>

          <div className="flex justify-center items-center gap-2.5">
            {btnText2 && btnClickHandler2 && (
              <MJButton className="bg-black text-white" onClick={btnClickHandler2}>
                {btnText2}
              </MJButton>
            )}
            {btnText && btnClickHandler && <MJButton onClick={btnClickHandler}>{btnText}</MJButton>}
          </div>
        </section>
      </div>
    </section>
  );
};

export default MJEmptyCard;
