import ImageCard from "../ImageCard/ImageCard";

import clsx from "clsx";
import css from "./ImageGallery.module.css";

export default function ImageGallery({ items, onImageClick }) {
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