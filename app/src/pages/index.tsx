import NewImageForm from "~/components/NewImageForm";

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

export default Home;
