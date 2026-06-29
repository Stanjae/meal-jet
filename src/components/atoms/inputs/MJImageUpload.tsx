import { useEffect, useState } from 'react';
import { IconRefreshAlert } from '@tabler/icons-react';
import { ActionIcon, FileButton, Image } from '@mantine/core';
import type { SetValues } from '@mantine/form';
import MJButton from '../buttons/MJButton';

type Props<T extends object = object> = {
  name: string;
  setValues: SetValues<T>;
  error: string;
  defaultValue: File | null | string;
  className?: string;
};

const MJImageUpload = ({ name, setValues, error, defaultValue, className }: Props) => {
  const [file, setFile] = useState<File | null | string>(defaultValue || null);
  const imageUrl = file instanceof File ? URL.createObjectURL(file as File) : file;

  useEffect(() => {
    if (!defaultValue) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFile(defaultValue);
  }, [defaultValue]);

  const handleFileChange = (filer: File | null) => {
    setFile(filer);
    if (filer) {
      setValues({
        [name]: filer,
      });
    } else {
      setValues({
        [name]: null,
      });
    }
  };

  const clearFile = () => {
    setFile(null);
    setValues({
      [name]: null,
    });
  };
  const defaultClassName =
    className ||
    ' border border-dashed h-28 w-28 rounded-full relative overflow-hidden flex items-center justify-center';
  return (
    <section>
      <div className="flex items-center gap-2">
        <div className={defaultClassName}>
          {imageUrl ? (
            <Image
              className="w-full h-full object-cover"
              src={imageUrl}
              onLoad={() => URL.revokeObjectURL(imageUrl as string)}
            />
          ) : (
            <p className="text-gray-500 text-xs text-center">Upload {name}</p>
          )}
        </div>

        <FileButton onChange={handleFileChange} accept="image/png,image/jpeg">
          {(props) => (
            <MJButton size="xs" {...props}>
              Upload
            </MJButton>
          )}
        </FileButton>
        {file && (
          <ActionIcon size="xs" color="red" variant="outline" onClick={clearFile}>
            <IconRefreshAlert />
          </ActionIcon>
        )}
      </div>
      {error && <p className=" text-red-500 text-xs mt-2">{error}</p>}
    </section>
  );
};

export default MJImageUpload;
