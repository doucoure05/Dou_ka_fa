import React, { Component } from "react";
import * as clientService from "../../services/ClientService";
import * as articleService from "../../services/ArticleService";
import * as categorieService from "../../services/CategorieService";
import Categorie from "../../models/Categorie";
import Article from "../../models/Article";
import Client from "../../models/Client";
import * as dashService from "../../services/DashService";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listClient: [],
      listArticle: [],
      listCategorie: [],
      clientsFidele: [],
      menuPlusVendus: [],
      venteJ: 0,
      venteM: 0,
      menuVenduJ: 0,
      menuVenduM: 0,
    };
  }

  getLIstClient() {
    clientService.getClient().then((clients) => {
      let list = [];
      clients.forEach((client) => {
        let cl = new Client(
          client.id,
          client.nom,
          client.prenom,
          client.telephone,
          client.adresse,
          client.point,
          client.photo
        );
        list.push(cl);
      });
      this.setState(
        {
          listClient: list,
        },
        () => {}
      );
    });
  }

  getLIstArticle() {
    articleService.getArticle().then((articles) => {
      let list = [];
      articles.forEach((article) => {
        let ar = new Article(
          article.id,
          article.nom,
          article.description,
          article.qteJour,
          article.prix,
          article.photo,
          article.point,
          article.categorieId
        );
        list.push(ar);
      });
      this.setState(
        {
          listArticle: list,
        },
        () => {
          //   console.log(this.state.listArticle);
        }
      );
    });
  }
  getCategorieName = (id) => {
    let cat =
      this.state.listCategorie.filter((c) => c.id === id).length > 0
        ? this.state.listCategorie.filter((c) => c.id === id)[0]
        : null;
    if (cat != null) {
      return cat.nom;
    } else return "";
    // return cat.nom;
  };

  getArticleName = (id) => {
    let art =
      this.state.listArticle.filter((a) => a.id === Number(id)).length > 0
        ? this.state.listArticle.filter((a) => a.id === Number(id))[0]
        : null;
    if (art != null) {
      return art.nom + "(" + this.getCategorieName(art.categorieId) + ")";
    } else return "";
  };

  getLIstCategorie() {
    categorieService.getCategorie().then((categories) => {
      let list = [];
      categories.forEach((categorie) => {
        let cl = new Categorie(categorie.id, categorie.nom);
        list.push(cl);
      });
      this.setState(
        {
          listCategorie: list,
        },
        () => {
          //   console.log(this.state.listCategorie);
        }
      );
    });
  }

  getArticleById = (id) => {
    let art =
      this.state.listArticle.filter((a) => a.id === Number(id)).length > 0
        ? this.state.listArticle.filter((a) => a.id === Number(id))[0]
        : null;
    return art;
  };

  getClientFidele() {
    dashService.getClientFidele().then((clients) => {
      //   console.log(clients);
      this.setState({
        clientsFidele: clients,
      });
    });
  }

  getMenuPlusVendu() {
    dashService.getMenuPlusVendu().then((myList) => {
      myList = myList.map((list) => {
        list.article = this.getArticleById(list.articleId);
        return list;
      });
      // console.log(myList);
      this.setState(
        {
          menuPlusVendus: [...myList],
        },
        () => {
          console.log(this.state.menuPlusVendus.length);
        }
      );
    });
  }

  getVentePeriod() {
    dashService.getVentePeriod().then((list) => {
      this.setState({
        venteJ: list.j,
        venteM: list.m,
      });
    });
  }

  getMenuVenduPeriod() {
    dashService.getMenuVenduPeriodJ().then((result) => {
      this.setState({
        menuVenduJ: result.j,
      });
    });

    dashService.getMenuVenduPeriodM().then((result) => {
      this.setState({
        menuVenduM: result.m,
      });
    });
  }

  componentDidMount() {
    this.getLIstClient();
    this.getLIstCategorie();
    this.getLIstArticle();

    this.getClientFidele();
    this.getMenuPlusVendu();
    this.getVentePeriod();
    this.getMenuVenduPeriod();
  }

  render() {
    return (
      <>
        <div>
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-12 text-center">
                  <h1>ACCEUIL</h1>
                </div>
              </div>
            </div>
          </section>
          <div className="dropdown-divider"></div>
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-3 col-6">
                  <div className="small-box bg-success">
                    <div className="inner">
                      <h2 className="text-center" style={{ color: "white" }}>
                        Total Client
                      </h2>
                      <h3 className="text-center" style={{ color: "white" }}>
                        {this.state.listClient.length}
                      </h3>
                    </div>
                    <div className="icon ">
                      {/* <span className="fas fa-user"></span> */}
                      <i
                        style={{ color: "white" }}
                        className="bi bi-people"
                      ></i>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-6">
                  <div className="small-box bg-success">
                    <div className="inner">
                      <h2 className="text-center" style={{ color: "white" }}>
                        Total Menu
                      </h2>
                      <h3 className="text-center" style={{ color: "white" }}>
                        {this.state.listArticle.length}
                      </h3>
                    </div>
                    <div className="icon">
                      <i
                        style={{ color: "white" }}
                        className="bi bi-journal"
                      ></i>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-6">
                  <div className="small-box bg-success">
                    <div className="inner">
                      <h2 className="text-center" style={{ color: "white" }}>
                        Vente(J/M)
                      </h2>
                      <h3 className="text-center" style={{ color: "white" }}>
                        {this.state.venteJ + "/" + this.state.venteM}
                      </h3>
                    </div>
                    <div className="icon">
                      <i style={{ color: "white" }} className="bi bi-coin"></i>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-6">
                  <div className="small-box bg-success">
                    <div className="inner">
                      <h2 className="text-center" style={{ color: "white" }}>
                        Menu Vendu(J/M)
                      </h2>
                      <h3 className="text-center" style={{ color: "white" }}>
                        {this.state.menuVenduJ + "/" + this.state.menuVenduM}
                      </h3>
                    </div>
                    <div className="icon">
                      <i style={{ color: "white" }} className="bi bi-shop"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dropdown-divider"></div>
              <div className="row">
                <div className="col-md-6">
                  <div className="card card-success card-outline">
                    <div className="card-header">
                      <h3 className="card-title">
                        Clients les <strong>+ fidèle</strong>
                      </h3>
                    </div>
                    <div className="card-body p-0">
                      {this.state.clientsFidele.length > 0 ? (
                        <table className="table">
                          <thead>
                            <tr>
                              <th style={{ width: "10px" }}>#</th>
                              <th>Nom</th>
                              <th>Prénom</th>
                              <th>Téléphone</th>
                              <th>Point de fidelité</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.clientsFidele.map((client, index) => (
                              <tr key={client.id}>
                                <td>{index + 1}</td>
                                <td>{client.nom}</td>
                                <td>{client.prenom}</td>
                                <td>{client.telephone}</td>
                                <td>{client.point}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <h2
                          style={{ marginTop: "10px" }}
                          className="text-center"
                        >
                          Liste vide
                        </h2>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card card-success card-outline">
                    <div className="card-header">
                      <h3 className="card-title">
                        Menus les <strong>+ vendu</strong>
                      </h3>
                    </div>
                    <div className="card-body p-0">
                      {this.state.menuPlusVendus.length > 0 ? (
                        <table className="table">
                          <thead>
                            <tr>
                              <th style={{ width: "10px" }}>#</th>
                              <th>Nom</th>
                              <th>Prix</th>
                              <th>Catégorie</th>
                              <th>Point de fidelité</th>
                              <th>Qte Vendu</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.menuPlusVendus.map((list, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                  {list.article != null
                                    ? list.article.nom
                                    : null}
                                </td>
                                <td>
                                  {list.article != null
                                    ? list.article.prix
                                    : null}
                                </td>
                                <td>
                                  {list.article != null
                                    ? this.getCategorieName(
                                        list.article.categorieId
                                      )
                                    : null}
                                </td>
                                <td>
                                  {list.article != null
                                    ? list.article.point
                                    : null}
                                </td>
                                <td>{list.qte}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <h2
                          style={{ marginTop: "10px" }}
                          className="text-center"
                        >
                          Liste vide
                        </h2>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </>
    );
  }
}
