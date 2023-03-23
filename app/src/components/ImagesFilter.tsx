import { type ChangeEventHandler, Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { useAtom } from "jotai";
import {
  imageSizesFilterAtom,
  imageTitleFilterAtom,
} from "~/atoms/imagesFilter";
import {
  type ImageSize,
  imageSizes as availableImageSizes,
} from "~/utils/imageSizes";
import { useDebounce } from "~/hooks/useDebounce";

const ImagesFilter = () => {
  return (
    <div className="grid gap-3 gap-y-4 sm:grid-cols-3">
      <div className="sm:col-span-2">
        <ImageTitleInput />
      </div>
      <ImageSizeSelect />
    </div>
  );
};

const ImageTitleInput = () => {
  const [imageTitle, setImageTitle] = useAtom(imageTitleFilterAtom);
  const [title, setTitle] = useState(imageTitle);
  const debounce = useDebounce(1000);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newTitle = e.currentTarget.value;
    setTitle(newTitle);
    debounce(() => setImageTitle(newTitle));
  };

  return (
    <input
      type="text"
      name="Title"
      max={30}
      value={title}
      onChange={handleChange}
      className="block w-full rounded-md border-0 py-2 text-sm text-gray-900 shadow-sm ring-2 ring-inset ring-transparent placeholder:text-gray-400 focus:ring-orange-500"
      placeholder="Title"
    />
  );
};

const ImageSizeSelect = () => {
  const [selectedImageSizes, setSelectedImageSizes] =
    useAtom(imageSizesFilterAtom);
  const [imageSizes, setImageSizes] = useState(selectedImageSizes);
  const debounce = useDebounce(1000);

  const handleChange = (newImageSizes: ImageSize[]) => {
    setImageSizes(newImageSizes);
    debounce(() => setSelectedImageSizes(newImageSizes));
  };

  return (
    <Listbox value={imageSizes} onChange={handleChange} multiple>
      <div className="relative">
        <Listbox.Button className="relative rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm ring-2 ring-inset ring-transparent hover:bg-indigo-500 focus:outline-none focus:ring-white sm:w-full">
          Sizes
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute left-1/2 z-10 mt-2 max-h-60 -translate-x-1/2 overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {availableImageSizes.map((size) => (
              <Listbox.Option
                key={size}
                className="cursor-pointer select-none py-2 px-4 text-gray-900 ui-selected:bg-indigo-600 ui-active:bg-gray-600"
                value={size}
              >
                <span className="ui-selected:font-semibold ui-selected:text-white ui-active:font-semibold ui-active:text-white">
                  {size}
                </span>
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default ImagesFilter;
