import React from 'react'

import { useParams } from "react-router-dom";

function Test() {

    const id  = useParams();
    console.log(id);

    return (
        <div>
            Hi
        </div>
    )
}

export default Test
