import Slider from "react-infinite-logo-slider";

const ClientsSlider = () => {
  const clients = [
    {
      id: 1,
      name: "The Capstone",
      logo: "/images/clients/capstone-logo.png",
    },
    {
      id: 2,
      name: "Nigerian Army",
      logo: "/images/clients/nigerian-amry-logo.png",
    },
    {
      id: 3,
      name: "Adron Homes",
      logo: "/images/clients/adron-logo.png",
    },
    {
      id: 4,
      name: "Carleton Hall",
      logo: "/images/clients/carleton-hall-logo.jpeg",
    },
    {
      id: 5,
      name: "Evangel Pentecostal Church",
      logo: "/images/clients/evangel-logo.png",
    },
    {
      id: 6,
      name: "FIA Home Creations Limited",
      logo: "/images/clients/fia-logo.png",
    },
    {
      id: 7,
      name: "GIG Logistics",
      logo: "/images/clients/gig-logo.png",
    },
    {
      id: 8,
      name: "Juanji Nigeria Limited",
      logo: "/images/clients/juanji-logo.png",
    },
    {
      id: 9,
      name: "Spur Steak Ranches",
      logo: "/images/clients/spur-logo.png",
    },
  ];

  return (
    <>
      <Slider
        width="250px"
        duration={40}
        pauseOnHover={true}
        blurBorders={false}
        blurBorderColor="#fff"
      >
        {clients.map((client) => (
          <Slider.Slide key={client.id}>
            <img src={client.logo} alt={client.name} className="w-36" />
          </Slider.Slide>
        ))}
      </Slider>
    </>
  );
};

export default ClientsSlider;
