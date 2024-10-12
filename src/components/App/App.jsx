import { useEffect, useState } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImageModal from "../ImageModal/ImageModal";
import Loader from "../Loader/Loader";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import SearchBar from "../SearchBar/SearchBar";
import { getImages } from "../../unsplash-api";
import { Toaster } from 'react-hot-toast';

import clsx from "clsx";
import css from "./App.module.css";


export default function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(999);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  
  useEffect(() => {
    if (query === "" || page > totalPages) {
      return;
    }

    async function getGallery () {
      try {
        setLoading(true);
        setError(false);
        const newImages = await getImages(query, page);
        setImages(prevState => [...prevState, ...newImages.results]);
        setTotalPages(newImages.total_pages);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getGallery();
  }, [query, page]);

   useEffect(() => {
    if (images.length > 0) {
      setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      }, 500);
    }
  }, [images]);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };
  
  const openModal = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };
    
    return (
        <div className={clsx(css.container)}>
            <SearchBar onSearch={handleSearch} />
            {images.length > 0 && (
                <ImageGallery
                    items={images}
                    onImageClick={(item) => openModal(item)}
                />
            )}
            
            {error && <ErrorMessage />}
            {loading && <Loader />}
            {images.length > 0 && !loading && page < totalPages && (
                <LoadMoreBtn onClick={handleLoadMore}
                />
            )}
            
            <ImageModal
                isOpen={modalOpen}
                onClose={closeModal}
                onImage={selectedImage}
            />
            <Toaster position="top-center" reverseOrder={false} />
        </div>
  );
}