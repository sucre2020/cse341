const efitaRoute = (req, res) => {
    res.send("Efita Effiom");
  };

  const lafuljiRoute = (req, res) => {
    res.send("Lafulji Effiom");
  };

  const muliiRoute = (req, res) => {
    res.send("Muli Effiom");
  };

  const amaRoute = (req, res) => {
    res.send("Ama Effiom");
  };

  const newRoute = (req, res) => {
    res.send("We are on post route");
  };



  module.exports = {
        efitaRoute,
        lafuljiRoute,
        muliiRoute,
        amaRoute,
        newRoute
    };