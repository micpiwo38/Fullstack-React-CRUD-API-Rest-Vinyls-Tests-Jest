import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddVinyl from "./AddVinyl";
import axios from "axios";

jest.mock("axios");

test("ajoute un vinyl via le formulaire et met à jour le DOM", async () => {
  const mockOnProductAdded = jest.fn();
  const mockSetDisplayForm = jest.fn();

  axios.post.mockResolvedValue({
    data: {
      id: 1,
      vinyl_name: "Nirvana",
      vinyl_description: "In Bloom",
      vinyl_price: 45.25,
      vinyl_image: "img.jpg",
    },
  });

  render(
    <AddVinyl
      onProductAdded={mockOnProductAdded}
      setDisplayForm={mockSetDisplayForm}
    />,
  );

  fireEvent.change(screen.getByPlaceholderText("Nom de l'artiste"), {
    target: { value: "Nirvana" },
  });

  fireEvent.change(screen.getByPlaceholderText("Nom de l'album"), {
    target: { value: "In Bloom" },
  });

  fireEvent.change(screen.getByPlaceholderText("125.25"), {
    target: { value: 45.25 },
  });

  fireEvent.change(screen.getByPlaceholderText("URL de l'image"), {
    target: { value: "img.jpg" },
  });

  fireEvent.click(screen.getByText("Ajouter le disque"));

  // 👉 On attend que React ait fini ses setState
  await waitFor(() => {
    expect(axios.post).toHaveBeenCalled();
  });

  expect(axios.post).toHaveBeenCalledWith("http://localhost:3001/vinyls", {
    vinyl_name: "Nirvana",
    vinyl_description: "In Bloom",
    vinyl_price: 45.25,
    vinyl_image: "img.jpg",
  });

  expect(mockOnProductAdded).toHaveBeenCalledWith({
    id: 1,
    vinyl_name: "Nirvana",
    vinyl_description: "In Bloom",
    vinyl_price: 45.25,
    vinyl_image: "img.jpg",
  });

  expect(mockSetDisplayForm).toHaveBeenCalledWith(false);

  // 👉 On attend que le DOM affiche le message de succès
  await waitFor(() => {
    expect(
      screen.getByText("Le disque à été ajoué avec succès !"),
    ).toBeInTheDocument();
  });
});
