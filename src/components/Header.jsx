import logo from '../assets/images/mazdoor-logo-file-web 1.png'
const Header=()=>{
    return (
        <header className="z-[999] bg-white flex w-full justify-between fixed top-0 py-5 px-20">
            <a href="#root" className="">
                <img src={logo} alt="logo"/>
            </a>
            <div>
                <ul className="flex font-['poppins'] space-x-10 mt-[20px]">
                    <i className="not-italic"><a className="actNav nav text-[18px] hover:text-[#EB5757] font-[500]" href="#whyMazdoor">Why MAZDOOR</a></i>
                    <i className="not-italic"><a className="nav hover:text-[#EB5757] font-[500]" href="#services">Services</a></i>
                    <i className="not-italic"><a className="nav hover:text-[#EB5757] font-[500]" href="#mazdoors">Mazdoors</a></i>
                    <i className="not-italic"><a className="mav hover:text-[#EB5757] font-[500]" href="#team">Team</a></i>
                    <i className="not-italic"><a className="nav hover:text-[#EB5757] font-[500]" href="#aboutUs">About Us</a></i>
                    <i className="not-italic"><a className="hover:text-[#EB5757]" href="#search"><span className="fa fa-magnifying-glass"></span></a></i>
                    <i className="not-italic"><a className="bg-[#EB5757] hover:bg-[#F2C94C] text-white px-[20px] py-[14px] rounded-[25px]" href="/login"><span className="fa fa-arrow-right-to-bracket mr-2"></span>Login</a></i>
                </ul>
            </div>
        </header>
    );
}

export default Header;
