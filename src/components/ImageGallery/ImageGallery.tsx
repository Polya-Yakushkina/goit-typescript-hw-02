import ImageCard from "../ImageCard/ImageCard";
import { Image } from "../types";
import clsx from "clsx";
import css from "./ImageGallery.module.css";


interface GalleryProps {
    items: Image[];
    onImageClick: (image: Image) => void;
}

const ImageGallery = ({ items, onImageClick }: GalleryProps) => {
    return (
        <ul className={clsx(css.list)}>
            {items.map((item) => (
                <li key={item.id} className={clsx(css.item)}>
                    <ImageCard
                        image={item}
                        onClick={() => onImageClick(item)}
                    />
                </li>
            ))}
        </ul>
    );
}

export default ImageGallery;