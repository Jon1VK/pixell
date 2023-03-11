import { useRouter } from "next/router";
import ColorSelector from "~/components/ColorSelector";
import ImageComponent from "~/components/ImageComponent";
import LoadingSpinner from "~/components/LoadingSpinner";
import { api } from "~/utils/api";

const ImagePage = () => {
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
    <div className="text-center">
      <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
        {image.title}
      </h1>
      <p className="mt-6 text-lg leading-8 text-gray-300">
        Select a color and start painting!
      </p>
      <ColorSelector />
      <ImageComponent image={image} width={512} height={512} colorable />
    </div>
  );
};

export default ImagePage;
