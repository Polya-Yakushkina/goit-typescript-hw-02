import { FC } from "react";
import clsx from "clsx";
import css from "./LoadMoreBtn.module.css";


interface LoadMoreProps {
    onClick: () => void;
}

const LoadMoreBtn: FC<LoadMoreProps> = ({ onClick }) => {
    return (
        <div className={clsx(css.container)}>
            <button
                type="button"
                onClick={onClick}
                className={clsx(css.btn)}
            >
                Load more
            </button>
        </div>
    );
}

export default LoadMoreBtn;