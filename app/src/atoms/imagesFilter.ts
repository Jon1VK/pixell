import { atom } from "jotai";
import { type ImageSize } from "~/utils/imageSizes";

type ImageFilter = {
  title: string;
  imageSizes: ImageSize[];
};

export const imagesFilterAtom = atom<ImageFilter>({
  title: "",
  imageSizes: [],
});

export const imageTitleFilterAtom = atom(
  (get) => get(imagesFilterAtom).title,
  (get, set, title: string) => {
    set(imagesFilterAtom, { ...get(imagesFilterAtom), title });
  }
);

export const imageSizesFilterAtom = atom(
  (get) => get(imagesFilterAtom).imageSizes,
  (get, set, imageSizes: ImageSize[]) => {
    set(imagesFilterAtom, { ...get(imagesFilterAtom), imageSizes });
  }
);
