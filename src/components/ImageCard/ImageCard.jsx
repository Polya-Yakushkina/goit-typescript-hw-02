import clsx from "clsx";
import css from "./ImageCard.module.css";

export default function ImageCard ({ image, onClick  }) {
    return (
        <div className={clsx(css.item)} onClick={onClick}>
            <img
                src={image.urls.small}
                alt={image.alt_description}
                className={clsx(css.img)} />
        </div>
    );
}