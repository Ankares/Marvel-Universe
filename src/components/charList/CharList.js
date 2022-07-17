
import { useState, useEffect, useRef, useMemo } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import './charList.scss';

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

// characters list
const CharList = (props) => {
    
    const [charList, setCharList] = useState([]);
    const [loadingMore, setLoadingMore] = useState(false); 
    const [offset, setOffset] = useState(210); 
    const [charEnded, setCharEnded] = useState(false); 

    const {loading, error, getAllCharacters, process, setProcess} = useMarvelService();
    
    useEffect(() => {
        onRequest(offset, true);
    }, [])

    
    const onRequest = (offset, initial) => {        
        initial ? setLoadingMore(false) : setLoadingMore(true); 
        getAllCharacters(offset)     
            .then(onCharListLoaded)
            .then(() => setProcess('confirmed'))
    }

    // loading more characters on the page
    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true
        }

        setCharList(charList => [...charList, ...newCharList]); 
        setLoadingMore(loadingMore => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);
    }

    const itemsRef = useRef([]);

    const focusOnItem = (id) => {
        itemsRef.current.forEach(item => item.classList.remove('char__item_selected'));
        itemsRef.current[id].classList.add('char__item_selected');
        itemsRef.current[id].focus();
    }

    function renderItems(arrayCharacters) {
        const characters = arrayCharacters.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }

            return (
                <li className='char__item' 
                    ref={el => itemsRef.current[i] = el} 
                    key={item.id} 
                    onClick={() => {
                        props.onCharSelected(item.id);
                        focusOnItem(i);
                        }}  
                    >
                    <img src={item.thumbnail} alt={item.name} style={imgStyle} />
                    <div className='char__name'>{item.name}</div>
                </li>
            )
        });

        return (
            <ul className='char__grid'>
                {characters}
            </ul>
        )
    }

    const elements = useMemo(() => {
        return setContent(process, () => renderItems(charList), loadingMore);  
    }, [process])
    return (
        <div className="char__list">
            {elements} 
            <button className="button button__main button__long"
                    disabled={loadingMore}
                    style={{'display': charEnded ? 'none' : 'block'}}
                    onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default CharList;