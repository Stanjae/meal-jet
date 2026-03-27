import { useEffect, useState } from 'react';
import { IconCloudUpload, IconTrash } from '@tabler/icons-react';
import { ActionIcon, FileButton, Image } from '@mantine/core';
import type { SetValues } from '@mantine/form';

type Props<T extends object = object> = {
  name: string;
  setValues: SetValues<T>;
  error: string;
  defaultValue: File | null | string;
  className?: string;
  label: string;
};

const MJDocumentUpload = ({ name, setValues, error, defaultValue, className, label }: Props) => {
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

  const clearFile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setFile(null);
    setValues({
      [name]: null,
    });
  };

  console.log('file', defaultValue, imageUrl);

  const defaultClassName =
    className ||
    ' border border-dashed h-28 w-28 rounded-full relative overflow-hidden flex items-center justify-center';
  return (
    <section>
      <FileButton onChange={handleFileChange} accept="image/png,image/jpeg">
        {(props) => (
          <div {...props} className={defaultClassName}>
            {imageUrl ? (
              <div className="flex items-center shadow rounded-sm gap-2 p-2">
                <Image
                  className=" size-10 object-cover"
                  src={imageUrl}
                  onLoad={() => URL.revokeObjectURL(imageUrl as string)}
                />
                <span>{file instanceof File ? file.name : file}</span>
                <ActionIcon
                  className="ml-auto"
                  size="xs"
                  color="red"
                  variant="outline"
                  onClick={clearFile}
                >
                  <IconTrash />
                </ActionIcon>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <IconCloudUpload size={32} />
                <p className="text-gray-500 text-xs text-center">Upload {label}</p>
              </div>
            )}
          </div>
        )}
      </FileButton>
      {error && <p className=" text-red-500 text-xs mt-2">{error}</p>}
    </section>
  );
};

export default MJDocumentUpload;
