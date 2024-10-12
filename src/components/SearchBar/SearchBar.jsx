import { Formik, Form, Field } from 'formik';
import { toast } from "react-hot-toast";

import clsx from "clsx";
import css from "./SearchBar.module.css";

export default function SearchBar({ onSearch }) {
  const handleSearch = (values, actions) => {
    if (!values.query) {
      toast.error("Please enter the search query!")
      return
    }
    onSearch(values.query);
    actions.resetForm();
  }

    return (
      <header className={clsx(css.container)}>
        <Formik
          initialValues={{ query: "" }}
          onSubmit={handleSearch}
        >
          <Form className={clsx(css.form)}>
            <Field 
              type="text"
              name="query"
              className={clsx(css.input)}
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
            <button type="submit" className={clsx(css.btn)}>Search</button>
          </Form>
        </Formik>
      </header>
    );
}