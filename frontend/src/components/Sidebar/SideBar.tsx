import { useEffect, useState } from 'react'
import "./SideBar.css"
import axios from 'axios';
import Language from '../../core/models/Languages';
import Genre from '../../core/models/Genre';
import Format from '../../core/models/Format';
import Filter from '../Filter/Filter';

type SideBarprops = {
    setLangFilter: (data: string[]) => void 
    setGenreFilter: (data: string[]) => void 
    setFormatFilter: (data: string[]) => void 
}

const SideBar = ({setLangFilter, setFormatFilter, setGenreFilter}: SideBarprops) => {
    const [langDropDown, setLangDropDown] = useState(false);
    const [genreDropDown, setGenreDropDown] = useState(false);
    const [formatDropDown, setFormatDropDown] = useState(false);

    const [languages, setLanguages] = useState<Language[]>([])
    const [genres, setGenres] = useState<Genre[]>([])
    const [formats, setFormats] = useState<Format[]>([])

    const getFormats = async () => {
        await axios.get<Format[]>("http://127.0.0.1:8000/movies/formats").
            then(response => setFormats(response.data))

        }
    const getLanguages = async () => {
        
        await axios.get<Language[]>("http://127.0.0.1:8000/movies/languages")
        .then(response => setLanguages(response.data))
    }
    
    const getGenres = async () => {
        await axios.get<Genre[]>("http://127.0.0.1:8000/movies/genres").
            then(response => setGenres(response.data))
    }
    
    useEffect(() => {
        try {
            getLanguages()
        }
        catch (error) {
            alert(error)
        }
    }, [langDropDown])

    useEffect(() => {
        try {
            getGenres()
        }
        catch (error) {
            alert(error)
        }
    }, [genreDropDown])

    useEffect(() => {
        try {
            getFormats()
        }
        catch (error) {
            alert(error)
        }
    }, [formatDropDown])


    const handleLangFilter = (filterdata: string[]) => {

        setLangFilter(filterdata)
    }
    
    const handleFormatFilter = (filterdata: string[]) => {
        setFormatFilter(filterdata)
    }
    
    const handleGenreFilter = (filterdata: string[]) => {
        setGenreFilter(filterdata)
    }

    return (
        <div className="side-bar-body">
            <div className='filter-heading'>
                <h2>
                    Filters
                </h2>
            </div>
            <Filter
                title={"Languages"}
                data={languages}
                dropDown={langDropDown}
                setDropDown={setLangDropDown}
                handleDataFilter={handleLangFilter}
            />
            <Filter
                title={"Formats"}
                data={formats}
                dropDown={formatDropDown}
                setDropDown={setFormatDropDown}
                handleDataFilter={handleFormatFilter}
            />
            <Filter
                title={"Genres"}
                data={genres}
                dropDown={genreDropDown}
                setDropDown={setGenreDropDown}
                handleDataFilter={handleGenreFilter}
            />
        </div>
    )
}

export default SideBar
