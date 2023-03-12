import { useRouter } from "next/router";
import ColorSelector from "~/components/ColorSelector";
import ImageComponent from "~/components/ImageComponent";
import ImagePlaceholder from "~/components/ImagePlaceholder";
import { api } from "~/utils/api";
import { classNames } from "~/utils/classNames";

const ImagePage = () => {
  const router = useRouter();
  const imageId = router.query.imageId as string;

  const imageQuery = api.image.get.useQuery({ id: imageId });

  if (imageQuery.isError) {
    return (
      <h1 className="text-center text-4xl font-bold tracking-tight text-white sm:text-6xl">
        Image not found
      </h1>
    );
  }

  const image = imageQuery.data;

  return (
    <div
      className={classNames(
        "text-center",
        imageQuery.isLoading ? "animate-pulse blur-md" : ""
      )}
    >
      <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
        {image?.title ?? "Placeholder"}
      </h1>
      <p className="mt-6 text-lg leading-8 text-gray-300">
        Select a color and start painting!
      </p>
      <div className="mt-10 flex flex-col items-center gap-10">
        {image ? (
          <>
            <ColorSelector />
            <ImageComponent image={image} width={512} height={512} colorable />
          </>
        ) : (
          <>
            <div className="h-7 w-7 rounded-full border-2 bg-orange-600 outline-4" />
            <ImagePlaceholder width={512} height={512} />
          </>
        )}
      </div>
    </div>
  );
};

export default ImagePage;
