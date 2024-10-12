import { FC } from "react";
import clsx from "clsx";
import css from "./Error.module.css";


interface ErrorProps {
    error: string;
}

const Error: FC<ErrorProps> = ({ error }) => {
    return (
        <div className={clsx(css.container)}>
            <p className={clsx(css.text)}>{error}</p>
        </div>
    );
}

export default Error;