import './Filter.css'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Language from '../../core/models/Languages';
import Genre from '../../core/models/Genre';
import Format from '../../core/models/Format';

type FilterProps ={
    title: string
    data: Language[] | Format[] | Genre[]
    dropDown: boolean
    setDropDown: (arg: boolean) => void
    handleDataFilter: (data: string[]) => void
}

const Filter = ({title, data, dropDown, setDropDown, handleDataFilter}: FilterProps) => {

    const handleFilter = (item: {name?: string, _type?: string, isSelected: boolean}) => {
        item.isSelected = !item.isSelected
        const filteredData = data.filter((datum) => datum.isSelected).map((datum) => datum.name? datum.name : datum._type)  
        handleDataFilter(filteredData);
    }
    
    return (
        <div>
            <div onClick={() => setDropDown(!dropDown)} className="heading-dropdown">
                <h4>
                    {title}
                </h4>
                <div>
                    {
                        dropDown ? <p><KeyboardArrowDownIcon /></p> : <p><KeyboardArrowRightIcon /></p>
                    }
                </div>
            </div>
            {dropDown && <div className='list'>
                <ul>
                    {data.map((item: {name?: string, _type?: string, isSelected: boolean}, index: number) => {                        
                        return (
                            <div key={index} onClick={() => handleFilter(item)}>
                                <p className={item.isSelected ? 'selected': ""}>
                                    {item.name ? item.name : item._type}
                                </p>
                            </div>
                        )
                    })}
                </ul>
            </div> }
        </div>
    )
}

export default Filter
