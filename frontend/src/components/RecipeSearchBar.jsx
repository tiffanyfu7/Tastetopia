import { useState, useEffect } from 'react';
import axios from 'axios';

const RecipeSearchBar = () => {
    const [query, setQuery] = useState('');
    const [done, setDone] = useState(false);
    const [fetchedData, setFetchedData] = useState([]);

    const searchEdamam = async () => {
        try {
            const response = await axios.post('http://localhost:8000/edamam/search', {
                q: query
            });
            const jsonData = JSON.parse(response.data);
            setFetchedData(jsonData.hits);
        } catch (error) {
            console.log('Error searching Edamam: ', error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        searchEdamam();
        setQuery('');
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input 
                    type='text'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}>
                </input>
                <button type='submit'>Search</button>
            </form>
        </>
    )
}

export default RecipeSearchBar