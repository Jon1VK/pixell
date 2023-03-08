import { type Pixel, type Prisma } from "@prisma/client";
import { atom, useAtom, useAtomValue } from "jotai";
import { useRouter } from "next/router";
import {
  type MouseEventHandler,
  type ChangeEventHandler,
  type CSSProperties,
  useRef,
} from "react";
import LoadingSpinner from "~/components/LoadingSpinner";
import { useSocketConnection } from "~/hooks/useSocketConnection";
import { api } from "~/utils/api";

const selectedColorAtom = atom("#f04e30");

const ImagePage = () => {
  useSocketConnection();

  const router = useRouter();
  const imageId = router.query.imageId as string;

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
  const throttleRef = useRef(false);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (throttleRef.current) return;
    throttleRef.current = true;
    setSelectedColor(e.currentTarget.value);
    setTimeout(() => (throttleRef.current = false), 100);
  };

  return (
    <input
      type="color"
      name="selectedColor"
      id="selectedColor"
      value={selectedColor}
      onChange={handleChange}
      className="mx-auto mt-10 block border-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
    />
  );
};

interface ImageComponentProps {
  image: Prisma.ImageGetPayload<{ include: { pixels: true } }>;
}

const ImageComponent = (props: ImageComponentProps) => {
  const apiUtils = api.useContext();
  const selectedColor = useAtomValue(selectedColorAtom);

  const pixelWidth = 512 / props.image.width;
  const pixelHeight = 512 / props.image.height;

  const updatePixel = async (pixel: { id: string; color: string }) => {
    if (selectedColor === pixel.color) return;
    await apiUtils.client.pixel.update.mutate({
      id: pixel.id,
      color: selectedColor,
    });
  };

  const getPixelData = (targetElement: HTMLElement) => ({
    pixelId: targetElement.dataset.pixelId,
    pixelColor: targetElement.dataset.pixelColor,
  });

  const handleMouseOver: MouseEventHandler<HTMLDivElement> = async (e) => {
    const { pixelId, pixelColor } = getPixelData(e.target as HTMLElement);
    if (!pixelId || !pixelColor || e.buttons !== 1) return;
    await updatePixel({ id: pixelId, color: pixelColor });
  };

  const handleMouseDown: MouseEventHandler<HTMLDivElement> = async (e) => {
    const { pixelId, pixelColor } = getPixelData(e.target as HTMLElement);
    if (!pixelId || !pixelColor || e.button !== 0) return;
    await updatePixel({ id: pixelId, color: pixelColor });
  };

  const handleClick: MouseEventHandler<HTMLDivElement> = async (e) => {
    const { pixelId, pixelColor } = getPixelData(e.target as HTMLElement);
    if (!pixelId || !pixelColor) return;
    await updatePixel({ id: pixelId, color: pixelColor });
  };

  return (
    <div className="overflow-x-auto">
      <div
        className={`mx-auto mt-10 grid min-w-max max-w-min grid-cols-${props.image.width} grid-rows-${props.image.height}`}
        style={{ "--selected-bg-color": selectedColor } as CSSProperties}
        onMouseOver={handleMouseOver}
        onMouseDown={handleMouseDown}
        onClick={handleClick}
      >
        {props.image.pixels.map((pixel) => (
          <PixelComponent
            key={pixel.id}
            pixel={pixel}
            width={pixelWidth}
            heigth={pixelHeight}
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
  const pixelQuery = api.pixel.get.useQuery(
    { id: props.pixel.id },
    { initialData: props.pixel, enabled: false }
  );

  const pixel = pixelQuery.data;

  const style = {
    width: props.width,
    height: props.heigth,
    "--bg-color": pixel.color,
  } as CSSProperties;

  return (
    <button
      className={`pixel pixel-colorable border hover:border-gray-900`}
      style={style}
      data-pixel-id={pixel.id}
      data-pixel-color={pixel.color}
    />
  );
};

export default ImagePage;
