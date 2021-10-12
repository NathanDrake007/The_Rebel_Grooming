import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
function Banner() {
	const images = [
		"https://firebasestorage.googleapis.com/v0/b/rebel-grooming.appspot.com/o/Banners%2FhomeBanner.jpg?alt=media&token=1a59bddb-dd67-43be-b113-f6bf1f3ca4bf",
		"https://firebasestorage.googleapis.com/v0/b/rebel-grooming.appspot.com/o/Banners%2FhomeBanner-2.jpg?alt=media&token=4943161b-dc09-4ea7-a6d3-45f4595c1b6d",
		"https://firebasestorage.googleapis.com/v0/b/rebel-grooming.appspot.com/o/Banners%2FhomeBanner-3.jpg?alt=media&token=f723fd37-9168-4d8c-8f8b-39d16b439fd0",
	];
	return (
		<Carousel autoPlay infiniteLoop showIndicators={false} showThumbs={false}>
			{images.map((image, index) => (
				<div key={`bannerImage-${index}`}>
					<img src={image} alt={`bannerImage-${index}`} />
				</div>
			))}
		</Carousel>
	);
}

export default Banner;
