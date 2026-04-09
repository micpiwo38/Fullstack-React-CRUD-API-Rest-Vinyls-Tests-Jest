import React, { useState } from "react";
import axios from "axios";

const AddVinyl = ({ onProductAdded, setDisplayForm }) => {
  //Un objet produits vinyl
  const empty_vinyl_object = {
    id: null,
    vinyl_name: "",
    vinyl_description: "",
    vinyl_price: 0,
    vinyl_image: "",
  };
  //Hook d'etat
  //Un objet = un objet vide = schema
  const [vinyl, setVinyl] = useState(empty_vinyl_object);
  //Etat du formulaire
  const [vinylFormIsSubmit, setVinylFormIsSubmit] = useState(false);

  //Action
  //Recuperer les valeurs du formulaire
  const handleInputChange = (event) => {
    event.preventDefault();
    //Assignation par decomposition
    const { name, value } = event.target; //Equivalent a const name = event.target.name donc <input name="title" value="Dark Side of the Moon" />
    //Le mutateur
    setVinyl({
      ...vinyl, //Copie l'objet existant => on ne modifie jamais un objet d’état directement.
      [name]: value, //Mise a jour des propriétée modifiée et affecte les valeurs
      //Dans json input name est la clé et value la valeur => exemple : "vinyl_price = [input name]": 56.35 = value{vinyl_price},
    });
  };
  //Sauver les données dans le backend db.json
  //Cette fonction doit etre asynchrone => await axios.post(...) attend que le serveur réponde
  const saveVinyl = async () => {
    let new_vinyl = {
      vinyl_name: vinyl.vinyl_name,
      vinyl_description: vinyl.vinyl_description,
      vinyl_price: vinyl.vinyl_price,
      vinyl_image: vinyl.vinyl_image,
    };
    try {
      const response = await axios.post(
        "http://localhost:3001/vinyls",
        new_vinyl,
      );
      if (
        response.data.vinyl_name === "" ||
        response.data.vinyl_description === "" ||
        response.data.vinyl_price === "" ||
        response.data.vinyl_image === ""
      ) {
        alert("Merci de remplir tous les champs du formulaire !");
      } else {
        //Le formulaire est remplis
        setVinyl({
          id: response.data.id,
          vinyl_name: response.data.vinyl_name,
          vinyl_description: response.data.vinyl_description,
          vinyl_price: response.data.vinyl_price,
          vinyl_image: response.data.vinyl_image,
        });
        setVinylFormIsSubmit(true);
        setTimeout(() => {
          {
            resetAddVinylForm();
          }
        }, 1000);
        onProductAdded(response.data); //Mise a jour de la liste des disques
        setDisplayForm(false);
      }
    } catch (e) {
      console.error("Erreur lors de l'ajout du vinyl !" + e);
    }
  };

  //Reset du formulaire
  const resetAddVinylForm = () => {
    setVinyl(empty_vinyl_object);
    setVinylFormIsSubmit(false);
  };
  return (
    <>
      <div className="container shadow mt-5 p-3 rounded">
        {vinylFormIsSubmit ? (
          <div className="alert alert-success p-3">
            <h4>Le disque à été ajoué avec succès !</h4>
          </div>
        ) : (
          <div className="container shadow rounded mt-3 p-3">
            <h4 className="text-center text-warning">Ajouter un disque</h4>
            <div className="mt-3 p-3">
              <input
                type="text"
                className="form-control"
                placeholder="Nom de l'artiste"
                required
                name="vinyl_name"
                value={vinyl.vinyl_name}
                onChange={handleInputChange}
              />
            </div>
            {/*TEXTAREA DESCRIPTION*/}
            <div className="mt-3">
              <textarea
                className="form-control"
                placeholder="Nom de l'album"
                required
                name="vinyl_description"
                value={vinyl.vinyl_description}
                onChange={handleInputChange}
              />
            </div>

            {/*PRIX*/}
            <div className="mt-3">
              <input
                type="number"
                className="form-control"
                placeholder="125.25"
                step="0.01"
                required
                name="vinyl_price"
                value={vinyl.vinyl_price}
                onChange={handleInputChange}
              />
            </div>
            {/*Image*/}
            <div className="mt-3">
              <input
                type="text"
                className="form-control"
                placeholder="URL de l'image"
                required
                name="vinyl_image"
                value={vinyl.vinyl_image}
                onChange={handleInputChange}
              />
            </div>
            {/*SOUMISSION*/}
            <button
              type="submit"
              className="btn btn-warning mt-3"
              onClick={saveVinyl}
            >
              Ajouter le disque
            </button>
            <a href="/vinyls" className="btn btn-info mx-3 mt-3">
              Annuler
            </a>
          </div>
        )}
      </div>
    </>
  );
};
export default AddVinyl;
