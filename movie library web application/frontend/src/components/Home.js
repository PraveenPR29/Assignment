import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../styles/Home.css';
import MovieDetails from './MovieDetails';

const Home = () => {
    const [query, setQuery] = useState('');
    const [lists, setLists] = useState([]);
    const [newListName, setNewListName] = useState('');
    const [selectedMovies, setSelectedMovies] = useState([]);
    const [isPublic, setIsPublic] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);

    const fetchMovies = async () => {
        if (query.trim() === '') return;
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/movies/search?query=${query}`);
            setSelectedMovies(res.data || []); // Assuming you want to update selectedMovies with fetched movies
        } catch (error) {
            console.error('Failed to fetch movies:', error);
            alert('Failed to fetch movies.');
        }
    };

    const fetchLists = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/movies/mylists`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setLists(res.data);
        } catch (error) {
            console.error('Failed to fetch movie lists:', error);
            alert('Failed to fetch movie lists.');
        }
    };

    const createList = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('You are not logged in. Please log in and try again.');
            return;
        }

        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}/movies/list`,
                { name: newListName, isPublic, movies: selectedMovies },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setLists([...lists, res.data]);
            setNewListName('');
            setSelectedMovies([]);
            setIsPublic(false);
        } catch (error) {
            console.error('Failed to create list:', error);
            alert('Failed to create list. Please ensure you are logged in and try again.');
        }
    };

    useEffect(() => {
        fetchLists();
    }, []);

    return (
        <div className="main-container">
            <div className="container">
                <h2>Home</h2>
                <div className="search-bar">
                    <input type="text" placeholder="Search movies..." value={query} onChange={(e) => setQuery(e.target.value)} />
                    <button onClick={fetchMovies}>Search</button>
                </div>
            </div>
            <div className="container create-list">
                <h3>Create New List</h3>
                <input
                    type="text"
                    placeholder="List Name"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                />
                <div>
                    <input
                        type="checkbox"
                        checked={isPublic}
                        onChange={() => setIsPublic(!isPublic)}
                    />
                    <label>Public</label>
                </div>
                <button onClick={createList}>Create List</button>
            </div>
            <div className="container my-lists">
                <h3>My Lists</h3>
                {lists.map((list) => (
                    <div key={list._id} className="list-card">
                        <h4>{list.name}</h4>
                        <p>{list.isPublic ? 'Public' : 'Private'}</p>
                        {list.movies.map((movie) => (
                            <div key={movie.imdbID}>
                                <h5>{movie.title}</h5>
                                <img src={movie.poster} alt={movie.title} />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div>
                {selectedMovie && <MovieDetails movie={selectedMovie} />}
            </div>
        </div>
    );
};

export default Home;
