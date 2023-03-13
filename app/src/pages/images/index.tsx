import { useAtomValue } from "jotai";
import Link from "next/link";
import { imagesFilterAtom } from "~/atoms/imagesFilter";
import ImageComponent from "~/components/ImageComponent";
import ImagePlaceholder from "~/components/ImagePlaceholder";
import ImagesFilter from "~/components/ImagesFilter";
import LoadingSpinner from "~/components/LoadingSpinner";
import { api } from "~/utils/api";
import { classNames } from "~/utils/classNames";

const PAGE_SIZE = 8;

const ImagesPage = () => {
  const filter = useAtomValue(imagesFilterAtom);

  const imagesQuery = api.image.getAll.useInfiniteQuery(
    {
      take: PAGE_SIZE,
      filter,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      cacheTime: 0,
    }
  );

  const pages = imagesQuery.data?.pages || [];
  const images = pages
    .flat()
    .map((page) => page.images)
    .flat();

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
        Images
      </h1>
      <p className="my-6 text-lg leading-8 text-gray-300">
        Browse the beautiful collection of PiXell art!
      </p>
      <ImagesFilter />
      {imagesQuery.isError && (
        <p className="text-lg font-bold leading-8 text-gray-300">
          An error occurred while fetching the images. Please, reload the page!
        </p>
      )}
      {!imagesQuery.isLoading && images.length === 0 && (
        <p className="mt-20 text-lg font-bold leading-8 text-gray-300">
          No images was found.{" "}
          <Link href="/" className="text-indigo-300 hover:text-indigo-400">
            Go and make one!
          </Link>
        </p>
      )}
      <div className="mt-20 grid items-end justify-items-center gap-y-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {images.map((image) => (
          <Link href={`/images/${image.id}`} key={image.id}>
            <h2 className="mb-4 text-lg font-medium tracking-tight text-gray-200 sm:text-xl">
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
        {imagesQuery.isFetching &&
          Array.from({ length: PAGE_SIZE }, (_, index) => (
            <div key={index} className="animate-pulse blur">
              <h2 className="mb-4 text-lg font-medium tracking-tight text-gray-200 sm:text-xl">
                Placeholder
              </h2>
              <ImagePlaceholder width={256} height={256} />
            </div>
          ))}
      </div>
      {!imagesQuery.isFetching && imagesQuery.hasNextPage && (
        <button
          disabled={imagesQuery.isFetching}
          onClick={() => imagesQuery.fetchNextPage()}
          className={classNames(
            "relative mt-20 overflow-hidden rounded-md px-3.5 py-2.5 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400",
            !imagesQuery.isFetching
              ? "bg-indigo-600 hover:bg-indigo-500"
              : "bg-gray-800"
          )}
        >
          {imagesQuery.isFetching && (
            <div className="absolute inset-0 backdrop-blur">
              <LoadingSpinner sm />
            </div>
          )}
          Load more
        </button>
      )}
    </div>
  );
};

export default ImagesPage;
