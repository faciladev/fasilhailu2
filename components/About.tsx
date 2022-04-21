export default function About() {
  return (
    <section id="about">
      <div className="container mx-auto flex px-10 py-20 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
            Hi, I'm Fasil.
            <br className="hidden lg:inline-block" /> I love to build amazing
            apps.
          </h1>
          <p className="mb-8 leading-relaxed">
            Problem solving and partnering with people to see through great
            ideas come to fruition is the most gratifying aspect of my career.
            {/* One of the best choices that I'm proud of is to make a
            career out of solving problems and partner with people to see
            through great ideas come to fruition. */}
            {/* There are little things in life that bring me so much joy other than
            knowing that I chose to make a career out of solving problems and
            partner with people to see through impactful ideas come to fruition. */}
          </p>
          <div className="flex justify-center">
            <a
              href="#contact"
              className="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg"
            >
              Work With Me
            </a>
            <a
              href="#projects"
              className="ml-4 inline-flex text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg"
            >
              See My Past Work
            </a>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 ">
          <img
            className="object-cover object-center rounded"
            alt="hero"
            // width="70%"
            src="https://s3.ap-south-1.amazonaws.com/my-portfolio-1-bucket/coding.png"
          />
        </div>
      </div>
    </section>
  );
}
