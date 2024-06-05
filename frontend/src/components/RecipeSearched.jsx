import { Recipes } from "../root/Recipes";
import { useParams } from 'react-router-dom';
import { useEffect, useContext, useState } from 'react';
import { QueryContext } from "./QueryContext";

const RecipeSearched = () => {
    const { q } = useParams();
    const { setQuery } = useContext(QueryContext);
    const [cleanQuery, setCleanQuery] = useState('');

    useEffect(() => {
        setCleanQuery(q.startsWith('q=') ? q.substring(2) : q)
        setQuery(cleanQuery);
    }, [q, setQuery]);

    return (
        <>
            <Recipes query={cleanQuery} />
        </>
    )
}

export default RecipeSearched