import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EditVinyl from "./EditVinyl";
import axios from "axios";

jest.mock("axios", () => ({
  put: jest.fn(),
  get: jest.fn(),
  post: jest.fn(),
  delete: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

test("met a jour un vinyls via le formulaire et appelle des callbasks", async () => {
  //1. Un objet faux vinyl
  const fakeVinyl = {
    id: 1,
    vinyl_name: "Nirvana",
    vinyl_description: "In Bloom",
    vinyl_price: "45.25",
    vinyl_image: "image.png",
  };

  //2. Mock des callbacks parent
  const mockOnVinylUpdate = jest.fn();
  const mockSetDisplayEditForm = jest.fn();

  //3. Mock de la reponse axios
  axios.put.mockResolvedValue({
    data: {
      id: 1,
      vinyl_name: "Nirvana Updated",
      vinyl_description: "In Bloom Updated",
      vinyl_price: "50.0",
      vinyl_image: "new_image.png",
    },
  });
  //4. Render du composant
  render(
    <EditVinyl
      vinyl={fakeVinyl}
      onVinylUpdated={mockOnVinylUpdate}
      setDisplayEditForm={mockSetDisplayEditForm}
    />,
  );
  //5. Modifier les champs
  fireEvent.change(screen.getByPlaceholderText("Nirvana"), {
    target: { value: "Nirvana Updated" },
  });

  fireEvent.change(screen.getByPlaceholderText("In Bloom"), {
    target: { value: "In Bloom Updated" },
  });

  fireEvent.change(screen.getByPlaceholderText("45.25"), {
    target: { value: "50.0" },
  });

  fireEvent.change(screen.getByPlaceholderText("image.png"), {
    target: { value: "new_image.png" },
  });

  //6. Cliquer sur Mettre a jour
  fireEvent.click(screen.getByText("Mettre à jour le disque"));

  //7. Attendre que React ait fini les mutation setState
  await waitFor(() => {
    expect(axios.put).toHaveBeenCalled();
  });

  //8. Verifié l'appel de API et la requète Http
  expect(axios.put).toHaveBeenCalledWith("http://localhost:3001/vinyls/1", {
    id: 1,
    vinyl_name: "Nirvana Updated",
    vinyl_description: "In Bloom Updated",
    vinyl_price: "50.0",
    vinyl_image: "new_image.png",
  });

  //9. Verifié que le parent est bien notifié
  expect(mockOnVinylUpdate).toHaveBeenCalledWith({
    id: 1,
    vinyl_name: "Nirvana Updated",
    vinyl_description: "In Bloom Updated",
    vinyl_price: "50.0",
    vinyl_image: "new_image.png",
  });

  //10. Verifié que le formulaire ce ferme
  expect(mockSetDisplayEditForm).toHaveBeenCalledWith(false);
});
