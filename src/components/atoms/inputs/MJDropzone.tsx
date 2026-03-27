import { useEffect, useState } from 'react';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import { ActionIcon, Group, Image, Text } from '@mantine/core';
import {
  Dropzone,
  IMAGE_MIME_TYPE,
  type DropzoneProps,
  type FileWithPath,
} from '@mantine/dropzone';
import type { SetFieldError, SetValues } from '@mantine/form';
import { millifyDigits } from '@/lib/utils/helpers/helpers';

type Props<T> = Partial<DropzoneProps> & {
  label?: string;
  setvalues?: SetValues<T>;
  name?: string;
  error?: string;
  defaultValue: FileWithPath[] | string[];
  setError?: SetFieldError<T>;
};

export function MJDropzone<T>(props: Props<T>) {
  const [files, setFiles] = useState<FileWithPath[] | string[]>(props.defaultValue ?? []);

  const handleClear = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    e.stopPropagation();
    const newFiles = [...files] as FileWithPath[];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    if (props.setvalues && props.name) {
      props.setvalues({
        [props.name]: newFiles,
      } as Partial<T>);
    }
  };

  useEffect(() => {
    if (props.defaultValue.length == 0) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFiles(props.defaultValue);
  }, [props.defaultValue]);

  const previews = files?.map((file, index) => {
    const imageUrl = typeof file === 'string' ? file : URL.createObjectURL(file);
    const imageName = typeof file === 'string' ? file.split('/').pop() || 'image' : file.name;
    return (
      <div
        className="flex items-center shadow px-3 py-1 rounded-sm gap-5 max-w-sm w-full"
        key={index}
      >
        <Image
          key={index}
          className="size-10"
          src={imageUrl}
          onLoad={() => URL.revokeObjectURL(imageUrl)}
        />
        <div>
          <h4 className="font-semibold truncate">
            {imageName.length > 20 ? `${imageName.slice(0, 20)}...` : imageName}
          </h4>
          {typeof file !== 'string' && (
            <span className="text-sm text-gray-500">
              {millifyDigits({ num: file.size, isBytes: true })}
            </span>
          )}
        </div>
        <ActionIcon className="ml-auto" variant="outline" onClick={(e) => handleClear(e, index)}>
          <IconX />
        </ActionIcon>
      </div>
    );
  });

  const handleDrop = (acceptedFiles: FileWithPath[]) => {
    const maxFiles = (props?.maxFiles as number) <= files.length;
    if (maxFiles) {
      props?.setError?.(props.name as string, 'You have reached the maximum number of files.');
      return;
    }
    const newFiles = [...files, ...acceptedFiles] as FileWithPath[];
    setFiles(newFiles);
    if (props.setvalues && props.name) {
      props.setvalues({
        [props.name]: newFiles,
      } as Partial<T>);
    }
  };

  return (
    <div>
      <Text className="my-1">{props.label}</Text>
      <Dropzone
        onDrop={handleDrop}
        disabled={props.disabled || props.maxFiles === 0}
        onReject={(files) => {
          const errorMessages = files[0].errors[0].message;
          if (props.setError && props.name) {
            props.setError(props.name, errorMessages);
          }
        }}
        accept={IMAGE_MIME_TYPE}
        className="border border-dashed rounded-2xl"
        {...props}
        maxSize={(props.maxSize || 5) * 1024 ** 2}
      >
        <Group justify="center" gap="xl" mih={220}>
          <Dropzone.Accept>
            <IconUpload size={52} color="var(--mantine-color-blue-6)" stroke={1.5} />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX size={52} color="var(--mantine-color-red-6)" stroke={1.5} />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto size={52} color="var(--mantine-color-dimmed)" stroke={1.5} />
          </Dropzone.Idle>

          <div>
            {files.length > 0 ? (
              previews
            ) : (
              <div>
                <Text size="lg" inline>
                  Drag image(s) here or click to select{' '}
                  {props.maxFiles == 1 ? 'file' : props.maxFiles + ' files'}
                </Text>
                <Text size="sm" c="dimmed" ta={'center'} inline mt={7}>
                  Attach as you like, file should not exceed {props.maxSize || 5}mb
                </Text>
              </div>
            )}
          </div>
        </Group>
      </Dropzone>
      {props.error && (
        <Text c="red" size="sm" mt={5}>
          {props.error}
        </Text>
      )}
    </div>
  );
}
