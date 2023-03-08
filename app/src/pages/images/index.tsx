import { type Prisma } from "@prisma/client";
import Link from "next/link";
import { type CSSProperties } from "react";
import LoadingSpinner from "~/components/LoadingSpinner";
import { useImageSocketConnection } from "~/hooks/useImageSocketConnection";
import { api } from "~/utils/api";

const ImagesPage = () => {
  const imagesQuery = api.image.getAll.useQuery();

  const images = imagesQuery.data ?? [];

  return (
    <div className="mx-auto text-center">
      <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
        Images
      </h1>
      <p className="my-6 text-lg leading-8 text-gray-300">
        Browse the beautiful collection of PiXell art!
      </p>
      {imagesQuery.isLoading && <LoadingSpinner />}
      {imagesQuery.isError && (
        <p className="text-gray-300-600 text-lg font-bold leading-8">
          An error occurred while fetching the images. Please, reload the page!
        </p>
      )}
      <div className="grid items-end justify-items-center gap-y-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {images.map((image) => (
          <Link href={`/images/${image.id}`} key={image.id}>
            <h2 className="my-3 text-lg font-medium tracking-tight text-gray-200 sm:text-xl">
              {image.title}
            </h2>
            <ImageComponent key={image.id} image={image} />
          </Link>
        ))}
      </div>
    </div>
  );
};

interface ImageComponentProps {
  image: Prisma.ImageGetPayload<{ include: { pixels: true } }>;
}

const ImageComponent = (props: ImageComponentProps) => {
  useImageSocketConnection(props.image.id);

  const pixelWidth = 256 / props.image.width;
  const pixelHeight = 256 / props.image.height;

  const imageQuery = api.image.get.useQuery(
    { id: props.image.id },
    { initialData: props.image }
  );

  const image = imageQuery.data;

  return (
    <div
      className={`mx-auto grid min-w-max max-w-min grid-cols-${props.image.width} grid-rows-${props.image.height}`}
    >
      {image.pixels.map((pixel) => (
        <div
          key={pixel.id}
          className={`pixel border`}
          style={
            {
              width: pixelWidth,
              height: pixelHeight,
              "--bg-color": pixel.color,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
};

export default ImagesPage;
