import { fetchFromTMDB } from "../services/TMDB.services.js";

export const getTredingMovie = async (req, res) => {
    try {
        const data = await fetchFromTMDB('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1');
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];
        res.json({ success: true, content: randomMovie });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to fetch trending movie" });
    }
};

export const getMovieTrailers = async (req, res) =>{
    const {id} = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);
        res.json({success:true, trailers: data.results});
    } catch (error) {
        if(error.message.includes(404)){
            res.status(404).send(null);
        }
        res.status(500).json({ success: false, message: "Failed to fetch movie trailers"});
    }
}

export const getMovieDetails = async (req, res) => {
    const { id } = req.params; 
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
        res.status(200).json({ success: true, details: data });
    } catch (error) {
       
        if (error.response && error.response.status === 404) {
            return res.status(404).send(null);
        }
       
        res.status(500).json({ success: false, message: "Failed to fetch movie details" });
    }
};
export const getSimilarMovies = async (req, res) => {
    const { id } = req.params; 
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1'`);
        res.status(200).json({ success: true, similar: data.results });
    } catch (error) {
       
        if (error.response && error.response.status === 404) {
            return res.status(404).send(null);
        }
       
        res.status(500).json({ success: false, message: "Failed to fetch movie details" });
    }
};

export const getMovieByCategory = async (req, res) => {
    const { category } = req.params; 
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);
        res.status(200).json({ success: true, content: data.results });
    } catch (error) {
       
        if (error.response && error.response.status === 404) {
            return res.status(404).send(null);
        }
       
        res.status(500).json({ success: false, message: "internal server error" });
    }
};



