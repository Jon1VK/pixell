import NewImageForm from "~/components/NewImageForm";

const Home = () => {
  return (
    <div className="mx-auto max-w-lg text-center">
      <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
        PiXell
      </h1>
      <p className="mt-6 mb-10 text-lg leading-8 text-gray-300">
        Collaboratively create visual art by editing one PiXell at a time.
        Generate a new image by selecting image dimensions.
      </p>
      <NewImageForm />
    </div>
  );
};

export default Home;
