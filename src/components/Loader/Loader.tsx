import { FC } from 'react';
import { ThreeDots } from 'react-loader-spinner';

import clsx from "clsx";
import css from "./Loader.module.css";


const Loader: FC = () => {
    return (
        <div className={clsx(css.container)}>
            <ThreeDots
                visible={true}
                height="80"
                width="80"
                color="#4fa94d"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    );
}

export default Loader;