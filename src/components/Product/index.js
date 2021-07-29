import React from "react";
import { connect } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "./product.css";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    minHeight: 600,
    backgroundColor: "#996b1e",
    margin: 15,
  },
  sub: {
    color: "white",
    fontSize: 22,
  },
  head: {
    color: "#45290c",
  },
  button: {
    color: "#45290c",
  },
});

function Product(props) {
  const { title, image, id, description_1, feature, price } = props.product;
  const url = `/product/${id}`;
  const handleBuy = () => {
    props.addToCart({ title, image, id, feature, price, quantity: 1 });
    console.log({ userId: props.userId, product: title });
  };

  const classes = useStyles();
  const history = useHistory();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          image={image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h3"
            component="h1"
            className={classes.head}
          >
            {title}
          </Typography>
          <Typography variant="subtitle1" className={classes.sub} component="p">
            {description_1}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="large" className={classes.button} onClick={handleBuy}>
          Buy
        </Button>
        <Button
          size="large"
          className={classes.button}
          onClick={() => history.push(url)}
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
// return (
//   <div className="col-md-6">
//     <div
//       className="product-small"
//       // style={{
//       //   backgroundImage: `url(${image})`,
//       //   backgroundPosition: "center",
//       //   backgroundRepeat: "no-repeat",
//       //   backgroundSize: "cover",
//       // }}
//     >
//       <h3>{title}</h3>
//       <h4>{description_1}</h4>
//       <div className="links small-link-margin">
//         <Link to={url} className="learn-more">
//           Learn more &nbsp;<i className="fa fa-angle-right"></i>
//         </Link>
//         <span
//           onClick={handleBuy}
//           style={{ cursor: "pointer", color: "burlywood" }}
//         >
//           Buy&nbsp;<i className="fa fa-angle-right"></i>
//         </span>
//       </div>
//       <img src={image} alt={title} className="product-image" />
//     </div>
//   </div>
// );
const mapStateToProps = (state) => {
  return { userId: state.auth.userId };
};
export default connect(mapStateToProps, { addToCart })(Product);
