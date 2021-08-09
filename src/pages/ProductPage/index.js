import React, { useState, useEffect } from "react";
import { firestore } from "../../utils/firebase";
import Banner from "../../components/Banner";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import "./product_page.css";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from "@material-ui/core/Grid";
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Container } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.up('md')]: {
    display: "flex",
    },
  },
grid:{
  padding: "25px 100px 50px 100px",
  [theme.breakpoints.down('md')]: {
    padding: "0px 50px 15px 50px"
  },
},
  cardImage:{
    objectFit: "contain",
    margin: "10px",
    [theme.breakpoints.down('md')]: {
      margin: "0px -5px 10px 0px",
    },
  },
  cardImage1:{
      objectFit: "contain",
      margin: "10px 10px 10px -10px",
      [theme.breakpoints.down('md')]: {
        margin: "10px -5px 0px 0px",
      },
  },
}));
function ProductPage(props) {
  const [product, setProduct] = useState(null);
  const classes = useStyles();
  useEffect(() => {
    async function fetchProducts() {
      await firestore
        .collection("products")
        .doc(props.match.params.id)
        .get()
        .then((doc) => {
          setProduct(doc.data());
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    }
    fetchProducts();
  }, [props.match.params.id]);

  const handleBuy = () => {
    // props.addToCart({ ...props.product, quantity: 1 });
    // console.log({ userId: props.userId, product: title });
  };
  const renderPage = () => { 
    return (
      <>
        <NavBar />
        <div className="productPage">
          <Banner
            title={product.title}
            description={product.feature}
            image={product.bannerImage}
          />
          <Grid container spacing={3} className={classes.grid}>
            <Grid item xs={12}>
            <Card className={classes.root}>
        <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          {product.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {product.description_1}
          </Typography>
        </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary" onClick={handleBuy}>
          Buy Now
        </Button>
      </CardActions>
      </CardActionArea>
      <Container>
        <CardMedia
            component="img"
            alt="beardWax"
            image={product.images[0]}
            title="beardWax"
            className={classes.cardImage}
          />
      </Container>
    </Card>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Card>
        <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          {product.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {product.description_1}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary" onClick={handleBuy}>
            Buy Now
          </Button>
        </CardActions>
      </CardActionArea>
        <CardMedia
          component="img"
          alt="beardWax"
          image={product.images[2]}
          title="beardWax"
        />

    </Card>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Card>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          {product.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {product.description_1}
          </Typography>
        </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary" onClick={handleBuy}>
          Buy Now
        </Button>
      </CardActions>
      </CardActionArea>
        <CardMedia
          component="img"
          alt="beardWax"
          image={product.images[3]}
          title="beardWax"
        />
    </Card>
    </Grid>
    <Grid item xs={12}>
      <Card className={classes.root}>
          <Container>
            <CardMedia
              component="img"
              alt="beardWax"
              image={product.images[1]}
              title="beardWax"
              className={classes.cardImage1}
            />
          </Container>
        <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          {product.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {product.description_4}
          </Typography>
        </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary" onClick={handleBuy}>
          Buy Now
        </Button>
      </CardActions>
      </CardActionArea>
    </Card>
    </Grid>
    </Grid>
        </div>
        <Footer />
      </>
    );
  };

  return product ? renderPage() : <div>Loading......</div>;
}

export default ProductPage;
