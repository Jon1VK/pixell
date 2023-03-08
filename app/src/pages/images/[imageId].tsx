import { type Pixel, type Prisma } from "@prisma/client";
import { atom, useAtom, useAtomValue } from "jotai";
import { useRouter } from "next/router";
import { type MouseEventHandler, type CSSProperties } from "react";
import LoadingSpinner from "~/components/LoadingSpinner";
import { useImageSocketConnection } from "~/hooks/useImageSocketConnection";
import { api } from "~/utils/api";

const selectedColorAtom = atom("#ffffff");

const ImagePage = () => {
  const router = useRouter();
  const imageId = router.query.imageId as string;

  useImageSocketConnection(imageId);

  const imageQuery = api.image.get.useQuery({ id: imageId });

  if (imageQuery.isLoading) return <LoadingSpinner />;

  if (imageQuery.isError) {
    return (
      <h1 className="text-center text-4xl font-bold tracking-tight text-white sm:text-6xl">
        Image not found
      </h1>
    );
  }

  const image = imageQuery.data;

  return (
    <div className="mx-auto text-center">
      <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
        {image.title}
      </h1>
      <p className="mt-6 text-lg leading-8 text-gray-300">
        Select a color and start painting!
      </p>
      <ColorSelector />
      <ImageComponent image={image} />
    </div>
  );
};

const ColorSelector = () => {
  const [selectedColor, setSelectedColor] = useAtom(selectedColorAtom);
  return (
    <input
      type="color"
      name="selectedColor"
      id="selectedColor"
      value={selectedColor}
      onChange={(e) => setSelectedColor(e.target.value)}
      className="mx-auto mt-10 block border-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
    />
  );
};

interface ImageComponentProps {
  image: Prisma.ImageGetPayload<{ include: { pixels: true } }>;
}

const ImageComponent = (props: ImageComponentProps) => {
  const selectedColor = useAtomValue(selectedColorAtom);

  return (
    <div className="overflow-x-auto">
      <div
        className={`mx-auto mt-10 grid min-w-max max-w-min grid-cols-${props.image.width} grid-rows-${props.image.height}`}
        style={{ "--selected-bg-color": selectedColor } as CSSProperties}
      >
        {props.image.pixels.map((pixel) => (
          <PixelComponent
            key={pixel.id}
            pixel={pixel}
            width={512 / props.image.width}
            heigth={512 / props.image.height}
          />
        ))}
      </div>
    </div>
  );
};

interface PixelComponentProps {
  width: number;
  heigth: number;
  pixel: Pixel;
}

const PixelComponent = (props: PixelComponentProps) => {
  const apiUtils = api.useContext();
  const selectedColor = useAtomValue(selectedColorAtom);

  const pixelQuery = api.pixel.get.useQuery(
    { id: props.pixel.id },
    { initialData: props.pixel }
  );

  const pixel = pixelQuery.data;

  const updatePixelColor = async () => {
    if (selectedColor === pixel.color) return;
    await apiUtils.client.pixel.update.mutate({
      id: pixel.id,
      color: selectedColor,
    });
  };

  const handleMouseDown: MouseEventHandler<HTMLButtonElement> = async (e) => {
    if (e.button === 0) {
      await updatePixelColor();
    }
  };

  const handleMouseEnter: MouseEventHandler<HTMLButtonElement> = async (e) => {
    if (e.buttons === 1) {
      await updatePixelColor();
    }
  };

  const style = {
    width: props.width,
    height: props.heigth,
    "--bg-color": pixel.color,
  } as CSSProperties;

  return (
    <button
      className={`pixel pixel-colorable border hover:border-gray-900`}
      style={style}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
    />
  );
};

export default ImagePage;
