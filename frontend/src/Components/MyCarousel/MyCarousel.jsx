import './MyCarousel.css'
import Carousel from 'react-bootstrap/Carousel'
import 'bootstrap/dist/css/bootstrap.min.css';

function MyCarousel(){
  return (
    <Carousel>
      <Carousel.Item>
        <div className="carousel-text">
          <h2>Document Browsing</h2>
          <p>Browse a diverse collection of documents, 
            from wedding cards to admission forms, all in one place.
          </p>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="carousel-text">
          <h2>Easy Downloads</h2>
          <p>Easily download documents with just a few clicks, available anytime, anywhere.</p>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="carousel-text">
          <h2>Send and Recieve Documents Via Email</h2>
          <p>Send and Recieve documents directly into your email address, anytime, anyday and anywhere streamlining your workflow</p>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}
export default MyCarousel;
