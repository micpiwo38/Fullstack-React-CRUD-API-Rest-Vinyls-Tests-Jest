import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Vinyls from "./Vinyls";
import axios from "axios";

//Mock de Axios tools
jest.mock("axios");
test("supprimer un vinyl après confirmation", async () => {
  //1. Mock de API pour charger les vinyls
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            id: "1",
            vinyl_name: "Nirvana",
            vinyl_description: "In bloom",
            vinyl_price: 45.25,
            vinyl_image: "https://m.media-amazon.com/images/I/61vJcHw2MWL.jpg",
          },
        ]),
    }),
  );
  //2. Mock du confirm -> l'utilisateur valide la confirmation
  window.confirm = jest.fn(() => true);
  //3. Mock de axios delete
  axios.delete.mockResolvedValue({});
  //4. rendu du composant
  render(<Vinyls />);
  //5. Verifier que le vinyl apparait
  expect(await screen.findByText("Nirvana")).toBeInTheDocument();
  //Le clic sur le bouton X
  const deleteButton = screen.getByText("X");
  //Trigger event
  fireEvent.click(deleteButton);
  //7. Verifier que axios supprime le vinyl dans URL de API
  expect(axios.delete).toHaveBeenCalledWith("http://localhost:3001/vinyls/1");
  //8. Verifier que le vinyl disparait du DOM
  await waitFor(() => {
    expect(screen.queryByText("Nirvana")).not.toBeInTheDocument();
  });
});
