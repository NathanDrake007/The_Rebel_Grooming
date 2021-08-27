import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { firestore } from "../../utils/firebase";
import blogDisplay from "../../assets/pictures/blogDisplay.jpg";
import temp from "../../assets/pictures/hairPutty-1.jpg";
import "./style.css";
import Loading from "../../components/Loading";
function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    async function fetchBlogs() {
      var temp = [];
      await firestore
        .collection("Blogs")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            temp.push({
              ...doc.data(),
              id: doc.id,
            });
          });
        });
      setBlogs(temp);
    }
    fetchBlogs();
  }, []);
  const renderPage = () => {
    return (
      <div>
        <img
          src={blogDisplay}
          alt="displayHeading3"
          style={{ width: "100%" }}
        />
        <div className="row row-cols-1 row-cols-md-4">
          {blogs.map((blog) => (
            <div className="col">
              <Link to={`/viewBlog/${blog.id}`} className="textDecoration">
                <div class="container text-center cardColor">
                  <img src={temp} class="card-img-top" alt="..." />
                  <div class="card-body">
                    <p class="card-text">
                      <small class="text-muted">{blog.date}</small>
                    </p>
                    <h5 class="card-title">{blog.title}</h5>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  };
  return blogs.length !== 0 ? renderPage() : <Loading />;
}

export default BlogPage;
