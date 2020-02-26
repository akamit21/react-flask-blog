import React from "react";
import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={`text-center ${styles.errorPage}`}>
      <h1>Page Not Found</h1>
      <p>Sorry, but the page you were trying to view does not exist.</p>
    </div>
  );
};

export default NotFound;
