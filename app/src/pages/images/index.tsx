import Link from "next/link";
import ImageComponent from "~/components/ImageComponent";
import LoadingSpinner from "~/components/LoadingSpinner";
import { api } from "~/utils/api";

const ImagesPage = () => {
  const imagesQuery = api.image.getAll.useQuery();
  const images = imagesQuery.data ?? [];

  return (
    <div className="text-center">
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
            <ImageComponent
              key={image.id}
              image={image}
              width={256}
              height={256}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ImagesPage;
