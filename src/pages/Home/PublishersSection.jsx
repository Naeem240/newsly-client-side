import Marquee from "react-fast-marquee";
import usePublishers from "../../hooks/usePublishers";
import Loading from "../../components/Loading";

const PublishersSection = () => {

  const {isLoading, publishers} = usePublishers();

  if (isLoading) {
    return <Loading/>;
  }

  return (
    <div className="bg-base-200 py-20">      
      <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-center border-b pb-4 border-primary text-primary">📰 Our Trusted Publishers</h2>

      <Marquee
        gradient={false}
        speed={15} // adjust speed
        pauseOnHover={true}
        direction="left"
      >
        {publishers.map((publisher) => (
          <div
            key={publisher._id}
            className="flex items-center justify-center mx-8"
          >
            <img
              src={publisher.logo}
              alt={publisher.name}
              className="h-16 w-auto object-contain border-2 border-primary"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default PublishersSection;
