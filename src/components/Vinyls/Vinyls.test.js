import { render, screen } from "@testing-library/react";
import Vinyls from "./Vinyls";

test("afficher la liste des vinyls pares chargement de API rest", async () => {
  //Mock de API rest
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            //Verifier que la page vinyl contient bien un vinyl => Nirvana
            id: 1,
            vinyl_name: "Nirvana",
            vinyl_description: "In bloom",
            vinyl_price: "45.25",
            vinyl_image: "https://m.media-amazon.com/images/I/61vJcHw2MWL.jpg",
          },
        ]),
    }),
  );
  window.confirm = jest.fn(() => true);
  //Attendre que le useEffect() carhe API
  render(<Vinyls />);
  //Check que l'objet Nirvana est bien dans la page
  expect(await screen.findByText("Nirvana")).toBeInTheDocument();
});
