import React, { useState } from "react";
import LoadingBox from "./LoadingBox";

const useFullPageLoader = () => {
    const [loading, setLoading] = useState(false);

    return [
        loading ? <LoadingBox /> : null,
        () => setLoading(true), //Show loader
        () => setLoading(false) //Hide Loader
    ];
};

export default useFullPageLoader;