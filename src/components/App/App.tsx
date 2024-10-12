import { useEffect, useState } from "react";
import Error from "../Error/Error";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImageModal from "../ImageModal/ImageModal";
import Loader from "../Loader/Loader";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import SearchBar from "../SearchBar/SearchBar";
import { getImages } from "../../unsplash-api";
import { Image } from "../types";
import { Toaster } from 'react-hot-toast';

import clsx from "clsx";
import css from "./App.module.css";


export default function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [images, setImages] = useState<Image[]>([]);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(999);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  
  useEffect(() => {
    if (query === "" || page > totalPages) {
      return;
    }

    async function getGallery () {
      try {
        setLoading(true);
        setError(false);
        setErrorMessage(null);
        const newImages = await getImages(query, page);
        setImages(prevState => [...prevState, ...newImages.results]);
        setTotalPages(newImages.total_pages);
      } catch (error) {
        setError(true);
        setErrorMessage("Oops... something went wrong!");
      } finally {
        setLoading(false);
      }
    }
    getGallery();
  }, [query, page]);

  useEffect(() => {
    if (images.length > 0) {
        const interval = setInterval(() => {
            window.scrollBy(0, 10);
            if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight) {
                clearInterval(interval);
            }
        }, 20);
        return () => clearInterval(interval);
    }
}, [images]);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };
  
  const openModal = (image: Image) => {
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
            
            {error && errorMessage && <Error error={errorMessage} />}
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