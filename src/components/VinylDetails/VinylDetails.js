const VinylDetails = ({ vinyl, toto }) => {
  return (
    <>
      <div className="container shadow mt-5 p-3 rounded">
        <h4 className="text-center text-warning">Détails du disque</h4>
        {vinyl ? (
          <div className="container shadow rounded mt-3 p-3">
            <div className="text-center mt-3">
              <img
                src={vinyl.vinyl_image}
                alt={vinyl.vinyl_name}
                title={vinyl.vinyl_name}
                className="img-fluid p-3"
                />
            </div>
            <div className="text-center">
              <h3 className="text-success">{vinyl.vinyl_name}</h3>
              <p className="text-info">Titre de l'album : {vinyl.vinyl_description}</p>
              <p className="text-bg-secondary p-3">PRIX : {vinyl.vinyl_price} €</p>
            </div>
          </div>
        ) : (
          <div className="alert alert-danger p-3">
            <h4>Aucun produit selectionné !</h4>
          </div>
        )}
      </div>
    </>
  );
};

export default VinylDetails;
