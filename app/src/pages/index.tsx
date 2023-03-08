import { useRouter } from "next/router";
import { useState } from "react";
import { z } from "zod";
import { api } from "~/utils/api";
import { classNames } from "~/utils/classNames";

const Home = () => {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
        PiXell
      </h1>
      <p className="mt-6 text-lg leading-8 text-gray-300">
        Collaboratively create visual art by editing one PiXell at a time.
        Generate a new image by inserting a title and selecting the image size.
      </p>
      <NewImageForm />
    </div>
  );
};

const imageSizes = ["8x8", "16x16", "32x32", "64x64"] as const;
type ImageSize = (typeof imageSizes)[number];

const NewImageForm = () => {
  const router = useRouter();
  const apiUtils = api.useContext();
  const [title, setTitle] = useState("");

  const validTitle = z.string().min(1).max(50).safeParse(title).success;

  const makeImageSizeClickHandler = (imageSize: ImageSize) => async () => {
    const image = await apiUtils.client.image.create.mutate({
      title,
      imageSize,
    });
    await router.push(`/images/${image.id}`);
  };

  return (
    <div className="mt-10">
      <label htmlFor="title" className="sr-only">
        Title
      </label>
      <input
        type="text"
        name="title"
        id="title"
        maxLength={50}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="block w-full rounded-md border-0 bg-gray-100 py-1.5 text-center text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
        placeholder="Image Title"
      />
      <div className="mt-10 flex items-center justify-center gap-x-6">
        {imageSizes.map((imageSize) => (
          <button
            key={imageSize}
            disabled={!validTitle}
            onClick={makeImageSizeClickHandler(imageSize)}
            className={classNames(
              "rounded-md px-3.5 py-2.5 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400",
              validTitle ? "bg-indigo-500 hover:bg-indigo-400" : "bg-gray-700"
            )}
          >
            {imageSize}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
