import NavBar from "../NavBar/NavBar";
import React, { useEffect, useState } from "react";
import VinylDetails from "../VinylDetails/VinylDetails";
import AddVinyl from "../AddVinyl/AddVinyl";
import axios from "axios";
import EditVinyl from "../EditVinyl/EditVinyl";

const Vinyls = () => {
  //Import

  //Const et Vars
  const [vinyls, setVinyls] = useState([]);
  const [selectedVinyls, setSelectedVinyls] = useState(null);
  const [displayAddForm, setDisplayAddForm] = useState(false);
  const [editingVinyl, setEditingVinyl] = useState(null);
  //State et Action
  const displayVinyls = () => {
    fetch("http://localhost:3001/vinyls")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setVinyls(data);
      })
      .catch((error) =>
        console.error("Erreur de chargement des données de l'API : " + error),
      );
  };
  //Selectionné un produit
  const getSelectedVinyl = (vinyl) => {
    setSelectedVinyls(vinyl);
  };

  //Mettre à jour la liste des produits
  const handle_vinyl_added = (new_vinyl) => {
    setVinyls([
      ...vinyls, //Copie du tableau de vinyl
      new_vinyl, // AJout du nouveau produit
    ]);
  };

  //Mettre jour un vinyl
  const handle_vinyl_updated = (updateVinyl) => {
    setVinyls(
      vinyls.map((vinyl) =>
        vinyl.id === updateVinyl.id ? updateVinyl : vinyl,
      ),
    );
  };

  //Supprimer un disque
  const deleteVinyl = (id) => {
    //La requete HTTP axios
    //let age = 15 et console.log("Vous avez : " + age + " ans);
    //console.log(`Vous avez ${age}`)
    const confirmDeleteMessage =
      "Valider la supression de ce disque ? Attention cette opération est définitive ! ";
    if (!window.confirm(confirmDeleteMessage)) {
      return;
    }
    try {
      axios
        .delete(`http://localhost:3001/vinyls/${id}`)
        .then((response) => {
          setVinyls(vinyls.filter((vinyl) => vinyl.id !== id));
        })
        .catch((error) =>
          console.error("Erreur lors de la supression du disque !"),
        );
    } catch (e) {
      console.error("Erreur de la requète HTTP Delete ! ");
    }
  };

  //Afficher - cacher le formulaire d'ajout des produits
  const switchAddForm = () => {
    setDisplayAddForm(!displayAddForm);
  };

  //Appel auto de la methode
  useEffect(() => {
    displayVinyls();
  }, []);
  //Render
  return (
    <>
      <header>
        <nav>
          <NavBar />
        </nav>
      </header>
      <div className="container shadow mt-5 p-3 rounded">
        <h1 className="text-center text-bg-info p-3">Nos disques vinyls !!!!!</h1>
        <div className="text-center">
          <button
            type="button"
            onClick={() => switchAddForm()}
            className="btn btn-success"
          >
            Ajouter un produit
          </button>
        </div>
        {/*Afficher le formulaire d'ajout de produit*/}
        {displayAddForm && (
          <AddVinyl
            onProductAdded={handle_vinyl_added}
            setDisplayForm={setDisplayAddForm}
          />
        )}
        <div className="row mb-3">
          <div className="col-9">
            <div className="container">
              <div className="row">
                {vinyls.map((vinyl, index) => (
                  <div className="col-md-3 col-sm-12 mt-3" key={index}>
                    <div className="card text-center mt-3 h-100 mb-3">
                      <div className="text-center mt-3">
                        <h3 className="text-success">{vinyl.vinyl_name}</h3>
                        <img
                          src={vinyl.vinyl_image}
                          alt={vinyl.vinyl_name}
                          title={vinyl.vinyl_name}
                          className="img-fluid p-3"
                        />
                      </div>
                      <div className="card-body">
                        <button
                          type="button"
                          className="btn btn-info"
                          onClick={() => getSelectedVinyl(vinyl)}
                        >
                          Afficher les details
                        </button>
                        <div className="text-center">
                          <button
                            type="button"
                            onClick={() => setEditingVinyl(vinyl)}
                            className="btn btn-success mt-3"
                          >
                            Editer le produit
                          </button>
                        </div>
                        <button
                          type="button"
                          className="btn btn-danger mt-3"
                          onClick={() => deleteVinyl(vinyl.id)}
                        >
                          X
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="rounded mt-3">
              <VinylDetails vinyl={selectedVinyls} />
            </div>
          </div>
          <div className="container">
            {editingVinyl && (
              <EditVinyl
                vinyl={editingVinyl}
                onVinylUpdated={handle_vinyl_updated}
                setDisplayEditForm={() => setEditingVinyl(null)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Vinyls;
