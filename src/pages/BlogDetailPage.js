import React, { useState, useEffect } from "react";
import { firestore } from "../utils/firebase";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import DataErrorPage from "./DataErrorPage";
function BlogDetailPage(props) {
	const [blog, setBlog] = useState(null);
	const [hasError, setHasError] = useState(false);
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
					setHasError(true);
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
						<h5>{item.content}</h5>
					</div>
				))}
				<div className="d-flex align-items-center">
					<h4>Confused which product to buy?</h4>
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
			{hasError ? (
				<DataErrorPage />
			) : blog !== null ? (
				renderPage()
			) : (
				<Loading />
			)}
			<Footer />
		</>
	);
}

export default BlogDetailPage;
