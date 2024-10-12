import Modal from 'react-modal';
import { FC } from 'react';
import { toast } from "react-hot-toast";
import { ImageModalProps } from '../types';
import clsx from "clsx";
import css from "./ImageModal.module.css";

Modal.setAppElement("#root");

const ImageModal: FC<ImageModalProps> = ({ isOpen, onClose, onImage }) => {
    if (!onImage)
        return null;

    const {
        urls = { small: "", regular: "" },
        alt_description,
        description,
        user = { name: "Unknown" },
        likes = 0
    } = onImage;

    const {
        regular: src = ""
    } = urls;
    
    const {
        name = "Unknown"
    } = user;

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Image Modal"
            className={clsx(css.modal)}
            overlayClassName={clsx(css.overlay)}
        >
            <div className={clsx(css.container)}>
                <img
                    src={src}
                    alt={alt_description}
                    className={clsx(css.img)}
                />
                <div className={clsx(css.details)}>
                    {description && <p className={clsx(css.text)}><b>Description</b>: {description}</p>}
                    {name && <p className={clsx(css.text)}><b>Author name</b>: {name}</p>}
                    {likes !== undefined && <p className={clsx(css.text)}><b>Likes</b>: {likes}</p>}
                    
                </div>
            </div>
        </Modal>
    );
}

export default ImageModal;