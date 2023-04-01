import labor from "../../assets/gifs/manBlowingAMan.gif";

const AboutUs = () => {
    return (
        <div id="aboutUS" className="flex flex-col px-20 mt-[200px]">
            <div className="relative">
                <span
                    className="absolute fa fa-wave-square text-[18px] text-[#EB5757] -top-9 right-0">
                </span>
                <span
                    className="absolute fa fa-wave-square text-[18px] text-[#EB5757] -top-14 right-0">
                </span>
            </div>
            <div className="flex justify-between">
                <div className="flex flex-col w-[30%]">
                    <p className="actNav text-[18px] relative">
                    <span
                        className="absolute rotate-[-25deg] bg-[#F2C94C] w-[14px] h-[14px] rounded-[3px] -top-10 left-0">
                        </span>
                        About Us
                    </p>
                    <h2 className="leading-[60px] font-bold text-[#333333] text-[45px]">
                        Know About Mazdoor
                    </h2>
                    <p className="text-[18px] text-[#333333] leading-[30px] mt-5 mb-10 w-[400px] font-[500]">
                        Discover Mazdoor wherever and whenever and get your Mazdoor at your doorstep.
                    </p>
                    <a className="text-center w-[150px] bg-[#EB5757] mb-[100px] hover:bg-[#F2C94C] text-white hover:text-black px-[20px] py-[14px] rounded-[25px]"
                       href="#">
                        Get The App
                    </a>
                </div>
                <div className="h-[628px] -mt-20 -mb-20">
                    <img src={labor} alt="man blowing a man"/>
                </div>
            </div>
        </div>
    );
}
export default AboutUs;
