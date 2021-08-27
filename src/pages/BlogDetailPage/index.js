import React, { useState, useEffect } from "react";
import { firestore } from "../../utils/firebase";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import "./style.css";
function BlogDetailPage(props) {
  const [blog, setBlog] = useState(null);
  useEffect(() => {
    async function fetchBlogs() {
      await firestore
        .collection("Blogs")
        .doc(props.match.params.id)
        .get()
        .then((doc) => {
          setBlog(doc.data());
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    }
    fetchBlogs();
  }, [props.match.params.id]);

  const renderPage = () => {
    return (
      <div className="container text-center  my-5">
        <h5>{blog.date}</h5>
        <h1 className="color-1">{blog.title}</h1>
        <p className="fs-4 text-dark">{blog.mainContent}</p>
        <img
          src={blog.image}
          alt={blog.title}
          className="image-fluid"
          width="100%"
        />
        {blog.secondaryContent.map((item) => (
          <div className="text-start my-5">
            <h2 className="color-1">{item.title}</h2>
            {item.content.map((con, index) => (
              <div>
                <h3 className="text-dark">
                  {index + 1}. {con.title}
                </h3>
                <p className="fs-4 text-dark">{con.content}</p>
              </div>
            ))}
          </div>
        ))}
        <div className="d-flex align-items-center">
          <h4>Confused which cream to buy?</h4>
          <Link to={`/product/${blog.link}`} className="nav-link fs-4">
            Click Here
          </Link>
        </div>
      </div>
    );
  };
  return (
    <>
      <NavBar />
      {blog !== null ? renderPage() : "loading..."}
      <Footer />
    </>
  );
}

export default BlogDetailPage;