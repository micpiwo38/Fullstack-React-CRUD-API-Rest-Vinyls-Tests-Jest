import React, { useState } from "react";
import Vinyls from "../Vinyls/Vinyls";
import axios from "axios";

const EditVinyl = ({vinyl, onVinylUpdated, setDisplayEditForm}) => {
    //Un objet produits vinyl
    const current_vinyl_object = {
        id: vinyl.id,
        vinyl_name: vinyl.vinyl_name,
        vinyl_description: vinyl.vinyl_description,
        vinyl_price: vinyl.vinyl_price,
        vinyl_image: vinyl.vinyl_image
    }
    //Hook d'etat
    //Un objet = un objet concerner = schema = useState prend le l'objet vinyl passé en props en paramètre
    const [currentVinyl, setCurrentVinyl] = useState(current_vinyl_object);
    //Etat du formulaire
    const [vinylFormIsSubmit, setVinylFormIsSubmit] = useState(false);

    //Action
    //Recuperer les valeurs du formulaire
    const handleInputChange = (event) => {
        event.preventDefault();
        //Assignation par decomposition
        const {name, value} = event.target; //Equivalent a const name = event.target.name donc <input name="title" value="Dark Side of the Moon" />
        //Le mutateur
        setCurrentVinyl({
            ...currentVinyl, //Copie l'objet courant => on ne modifie jamais un objet d’état directement.
            [name]: value //Mise a jour des propriétée modifiée et affecte les valeurs
            //Dans json input name est la clé et value la valeur => exemple : "vinyl_price = [input name]": 56.35 = value{vinyl_price},
        });
    }
    //Sauver les données dans le backend db.json
    //Cette fonction doit etre asynchrone => await axios.post(...) attend que le serveur réponde
    const saveVinyl = async () => {
        try{
            const response = await axios.put(`http://localhost:3001/vinyls/${currentVinyl.id}`, currentVinyl);
            if(
                response.data.vinyl_name === "" ||
                response.data.vinyl_description === "" ||
                response.data.vinyl_price === "" ||
                response.data.vinyl_image === ""
            ){
                alert("Merci de remplir tous les champs du formulaire !");
            }else{
                //Le formulaire est remplis
                setCurrentVinyl({
                    id: response.data.id,
                    vinyl_name: response.data.vinyl_name,
                    vinyl_description: response.data.vinyl_description,
                    vinyl_price: response.data.vinyl_price,
                    vinyl_image: response.data.vinyl_image
                });
                setVinylFormIsSubmit(true);
                onVinylUpdated(response.data); //Mise a jour de la liste des disques
                setDisplayEditForm(false);
            }
        }catch (e) {
            console.error("Erreur lors de l'ajout du vinyl !" + e);
        }
    }

    //Reset du formulaire
    const resetAddVinylForm = () => {
        setCurrentVinyl(current_vinyl_object);
        setVinylFormIsSubmit(false);
    }
    return(
        <>
            <div className="container shadow mt-5 p-3 rounded">
                {vinylFormIsSubmit ?(
                    <div className="alert alert-success p-3">
                        <h4>Le disque à été ajoué mis a jour !</h4>
                        {resetAddVinylForm()}
                    </div>
                ) : (
                    <div className="container shadow rounded mt-3 p-3">
                        <h4 className="text-center text-danger">Editer le disque {vinyl.vinyl_name}</h4>
                        <div className="mt-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder={vinyl.vinyl_name}
                                required
                                name="vinyl_name"
                                value={currentVinyl.vinyl_name}
                                onChange={handleInputChange}
                            />
                        </div>
                        {/*TEXTAREA DESCRIPTION*/}
                        <div className="mt-3">
                            <textarea
                                className="form-control"
                                placeholder={vinyl.vinyl_description}
                                required
                                name="vinyl_description"
                                value={currentVinyl.vinyl_description}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/*PRIX*/}
                        <div className="mt-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder={vinyl.vinyl_price}
                                step="0.01"
                                required
                                name="vinyl_price"
                                value={currentVinyl.vinyl_price}
                                onChange={handleInputChange}
                            />
                        </div>
                        {/*Image*/}
                        <div className="mt-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder={vinyl.vinyl_image}
                                required
                                name="vinyl_image"
                                value={currentVinyl.vinyl_image}
                                onChange={handleInputChange}
                            />
                        </div>
                        {/*SOUMISSION*/}
                        <button type="submit" className="btn btn-warning mt-3" onClick={saveVinyl}>Mettre à jour le disque</button>
                        <a href="/vinyls" className="btn btn-info mx-3 mt-3">Annuler</a>
                    </div>
                )}
            </div>
        </>
    )

}

export default EditVinyl;
