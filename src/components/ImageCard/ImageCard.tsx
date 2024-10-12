import { Image } from "../types";
import clsx from "clsx";
import css from "./ImageCard.module.css";


interface ImageCardProps {
    image: Image;
    onClick: () => void;
}

const ImageCard = ({ image, onClick  }: ImageCardProps) => {
    return (
        <div className={clsx(css.item)} onClick={onClick}>
            <img
                src={image.urls.small}
                alt={image.alt_description}
                className={clsx(css.img)} />
        </div>
    );
}

export default ImageCard;