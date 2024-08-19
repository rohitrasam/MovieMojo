import { useEffect, useState } from 'react'
import "./SideBar.css"
import axios from 'axios';
import Language from '../../core/models/Languages';
import Genre from '../../core/models/Genre';
import Format from '../../core/models/Format';
import Filter from '../Filter/Filter';



const SideBar = () => {
    const [langDropDown, setLangDropDown] = useState(false);
    const [genreDropDown, setGenreDropDown] = useState(false);
    const [formatDropDown, setFormatDropDown] = useState(false);

    const [languages, setLanguages] = useState<Language[]>([])
    const [genres, setGenres] = useState<Genre[]>([])
    const [formats, setFormats] = useState<Format[]>([])

    const getInfo = async () => {
        await axios.get<Format[]>("http://127.0.0.1:8000/movies/formats").
        then(response => setFormats(response.data))

        await axios.get<Language[]>("http://127.0.0.1:8000/movies/languages")
        .then(response => setLanguages(response.data))

        await axios.get<Genre[]>("http://127.0.0.1:8000/movies/genres").
        then(response => setGenres(response.data))
    }

    useEffect(() => {
        try{
            getInfo()
        }
        catch(error){
            alert(error)
        }
    }, [langDropDown, genreDropDown, formatDropDown])

    return (
        <div className="side-bar-body">
            <div className='filter-heading'>
                <h2>
                    Filters
                </h2>
            </div>
            <Filter title={"Languages"} data={languages} dropDown={langDropDown} setDropDown={setLangDropDown}/>
            <Filter title={"Formats"} data={formats} dropDown={formatDropDown} setDropDown={setFormatDropDown}/>
            <Filter title={"Genres"} data={genres} dropDown={genreDropDown} setDropDown={setGenreDropDown}/>
        </div>
    )
}

export default SideBar
