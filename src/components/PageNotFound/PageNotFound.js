import styles from "./PageNotFound.module.css";

const PageNotFound = () => {
  return (
    <div className="container text-center">
      <div className="alert alert-danger p-3 mt-3">
        <h1 className="text-danger text-center">Page introuvable</h1>
        <hr />
        <p>Ceci est une erreur 404 : la page n'existe pas</p>
        <hr />
        <div className="text-center">
          <a href="/" className="btn btn-info">
            Retour
          </a>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
