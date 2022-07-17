import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './comicsList.scss';

const setContent = (process, Component, loadingMore) => {
    switch (process) {
        case 'waiting':
            return <Spinner/>;
            break;
        case 'loading':
            return loadingMore ? <Component/> : <Spinner/>;
            break;
        case 'confirmed':
            return  <Component/>;
            break;
        case 'error':
            return <ErrorMessage/>
            break;
        default:
            throw new Error('Unexpected process state');
    }
}

// comics list
const ComicsList = () => {

    const [comicsList, setComicsList] = useState([]);
    const [loadingMore, setLoadingMore] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {loading, error, getAllComics, process, setProcess} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {        
        initial ? setLoadingMore(false) : setLoadingMore(true); 
        getAllComics(offset)
            .then(onComicsListLoaded)  
            .then(() => setProcess('confirmed'))
    }

    // load new comics on the page
    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }
        setComicsList([...comicsList, ...newComicsList]);
        setLoadingMore(false);
        setOffset(offset + 8);
        setComicsEnded(ended);
    }

    function renderItems (comicsArray) {
        const comics = comicsArray.map((item, i) => {
            return (
                <li className="comics__item" key={i}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className='comics__item-img'/>
                        <div className='comics__item-name'>{item.title}</div>
                        <div className='comics__item-price'>{item.price}</div>
                    </Link>
                </li>
            )
        })

        return (
            <ul className='comics__grid'>
                {comics}
            </ul>
        )
    }

    return (
        <div className="comics__list">
             {setContent(process, () => renderItems(comicsList), loadingMore)}  
            <button className="button button__main button__long"
                    disabled={loadingMore}  
                    style={{'display' : comicsEnded ? 'none' : 'block'}}
                    onClick={() => onRequest(offset)}>  
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;