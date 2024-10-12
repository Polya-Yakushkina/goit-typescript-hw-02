import Modal from 'react-modal';

import clsx from "clsx";
import css from "./ImageModal.module.css";

Modal.setAppElement("#root");

export default function ImageModal({ isOpen, onClose, onImage }) {
    if (!onImage) return null;

    const {
        urls = {},
        alt_description,
        description,
        user = {},
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


// useEffect та функція handleEsc для закриття модального вікна великого зображення
// по кліку на клавішу Esc. Але вони не потрібні в цьому коді, оскільки працюють
// підкапотно в бібліотеці React Modal (залишу про всяк випадок на майбутнє).

// useEffect(() => {
//         const handleEsc = (event) => {
//             if (event.key === 'Escape') {
//                 onClose();
//             }
//         };

//         window.addEventListener('keydown', handleEsc);
//         return () => {
//             window.removeEventListener('keydown', handleEsc);
//         };
//     }, [onClose]);