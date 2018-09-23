const express = require("express");
const path = require("path");
const app = express();
const url = require("url");

app.use("/:id", express.static(path.join(__dirname + "/public")));
// console.log("Joined path: " + path.join(__dirname + "/public"));

// Note: use Express, to re-direct relative paths
// Note: use Amazon EC2, for team members to host their micro services
const carouselServer = "http://54.183.146.159";
const sideBarServer = "http://18.191.153.175:3004";
const ratingsAndReviewsServer = "http://13.57.214.131:30";
const rvDealsServer = "http://54.193.11.2:3000";
// const carouselServer = "http://localhost:3001";
// const sideBarServer = "http://localhost:3004";
// const ratingsAndReviewsServer = "http://localhost:3002";
// const rvDealsServer = "http://localhost:3003";

app.get("/:id/api/images", function(req, res) {
  const id = req.params.id;
  res.redirect(`${carouselServer}/${id}/api/images`);
});

app.get("/:id/api/products", function(req, res) {
  let id = req.params.id;
  res.redirect(`${sideBarServer}/${id}/api/products`);
});

// Note: url.format adds additional format (e.g. ?), because this get request has 2 params
app.get("/:dealId/api/ratings", function(req, res) {
  // res.redirect(`${ratingsAndReviewsServer}/${dealId}/api/ratings`);

  const dealId = req.params.dealId;
  res.redirect(
    url.format({
      pathname: `${ratingsAndReviewsServer}/${dealId}/api/ratings`,
      query: req.query
    })
  );
  // console.log(
  //   url.format({
  //     pathname: `${ratingsAndReviewsServer}/${dealId}/api/ratings`,
  //     params: req.query
  //   })
  // );
});

app.get("/:dealId/api/reviews", function(req, res) {
  const dealId = req.params.dealId;
  res.redirect(`${ratingsAndReviewsServer}/${dealId}/api/reviews`);
});

app.get(`/:id/api/recently-viewed-product-data`, function(req, res) {
  const id = req.params.id;
  res.redirect(`${rvDealsServer}/${id}/api/recently-viewed-product-data`);
});

app.get(`/:id/api/recently-viewed-service-data`, function(req, res) {
  const id = req.params.id;
  res.redirect(`${rvDealsServer}/${id}/api/recently-viewed-service-data`);
});

// Note: moved port number from here to Dockerfile
const port = process.env.PORT || 3000; // For testing
// const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
