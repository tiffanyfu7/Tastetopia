import React, { useState } from 'react';
import { QueryContext } from './QueryContext';

const QueryProvider = ({ children }) => {
    const [query, setQuery] = useState('');
    const [searchRequested, setSearchRequested] = useState('pasta');

    return (
        <QueryContext.Provider value={{ 
            query,
            searchRequested,
            setQuery,
            setSearchRequested
        }}>
            {children}
        </QueryContext.Provider>
    );
};

export { QueryProvider };