import { BaseSyntheticEvent, useState, } from 'react'
import './Navbar.css'
import titleImg from '../../assets/logo3.png'
import { Link } from 'react-router-dom'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom'


const Navbar = () => {

    const navigate = useNavigate();
    const [currentCity, setCurrentCity] = useState<string>("");
    const [cityDropDown, setCityDropDown] = useState<boolean>(false);
    // const dropDownRef = useRef<HTMLDivElement>(null);
    const cities = ["Pune", "Bengaluru", "Mumbai", "Chennai", "Delhi", "Chandigarh"]

    const handleSelectCity = (e: BaseSyntheticEvent, city: string) => {
        setCityDropDown(false)
        setCurrentCity(city);
        localStorage.setItem('location', city)
    }

    // useEffect(() => {

    //     const handler = (event) => {
    //         console.log(event);
    //         console.log(dropDownRef);

    //         if (dropDownRef.current !== event.target) {
    //             setCityDropDown(false);
    //         }

    //         window.addEventListener("click", handler);

    //         return () => {
    //             window.removeEventListener("click", handler);
    //         }
    //     };

    // })

    return (
        <div className='nav-bar'>

            <div className='logo-container' onClick={() => navigate('/home', {state: {isAdmin: true}})}>
                <Link to='/home'>
                    <img src={titleImg} alt="movie logo" />
                </Link>
                <h2 className='logo-title'>
                    Movie Mojo
                </h2>
            </div>

            <div className='city-profile-container'>
                {/* <div className='city-container' ref={dropDownRef}> */}
                <div className='city-container'>
                    <div onClick={() => setCityDropDown(!cityDropDown)} className='current-city-container'>
                        <p className='current-city'>
                            {currentCity === "" ? "Select City" : currentCity}
                        </p>
                        <KeyboardArrowDownIcon />
                    </div>
                    {cityDropDown && <div className='city-list-container'>
                        <ol className='city-list'>
                            {cities.map((city, index: number) => {
                                return (
                                    <div onClick={(e) => handleSelectCity(e, city)} key={index} className='city-container'>
                                        <p className='city'>
                                            {city}
                                        </p>
                                    </div>
                                )
                            })}
                        </ol>
                    </div>}
                </div>
                <div className='user-profile-container'>
                    <div className='user-profile' 
                    // onClick={() => navigate('/user/userId')}
                    >
                        <PersonIcon />
                        <p>
                            Hello, Guest
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
