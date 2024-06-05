import React, { useState } from 'react';
import { QueryContext } from './QueryContext';

const QueryProvider = ({ children }) => {
    const [query, setQuery] = useState('');

    return (
        <QueryContext.Provider value={{ 
            query,
            setQuery 
        }}>
            {children}
        </QueryContext.Provider>
    );
};

export { QueryProvider };