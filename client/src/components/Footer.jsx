import logo from "../assets/images/mazdoor-logo-file-web 1.png";
import { Link } from "react-router-dom";

const Footer=()=>{
    return (
        <footer className="flex flex-col space-y-10 px-20 pt-5 bg-lightBg">
            <div className="flex justify-between">
                <div className="flex flex-col space-y-8 w-[270px]">
                    <div>
                        <Link
                          to="/"
                           className="w-[22%]">
                            <img className="object-fill w-[100%] h-[100%]" src={logo} alt="logo"/>
                        </Link>
                    </div>
                    <p className="text-[16px] font-[500] text-[#333333] leading-[30px]">
                        Our job is to find you Labor at your Door Step on just a Phone call free of cost.
                    </p>
                    <div className="flex space-x-8">
                        <a
                          target="_blank"
                          href="https://www.instagram.com/mazdoor.pk/"
                           className="text-[#EB5757] text-[24px] hover:text-black fa-brands fa-instagram"></a>
                        <a
                          target="_blank"
                          href="https://www.facebook.com/Mazdoor.Pak/"
                           className="text-[#EB5757] text-[24px] hover:text-black fa-brands fa-facebook-f"></a>
                    </div>
                </div>
                <div className="flex space-x-8 pt-7">
                    <div className="flex flex-col space-y-5">
                        <h4 className="font-[600] text-black text-[20px] leading-[22px]">About</h4>
                        <a href="#aboutUS" className="text-[16px] hover:font-[500] leading-[30px]">About Us</a>
                        <a href="#" className="text-[16px] hover:font-[500] leading-[30px]">Features</a>
                    </div>
                    <div className="flex flex-col space-y-5">
                        <h4 className="font-[600] text-black text-[20px] leading-[22px]">Company</h4>
                        <a href="#whyMazdoor" className="text-[16px] hover:font-[500] leading-[30px]">Why Labor?</a>
                        <a href="#" className="text-[16px] hover:font-[500]  leading-[30px]">FAQ</a>
                    </div>
                    <div className="flex flex-col space-y-5">
                        <h4 className="font-[600] text-black text-[20px] leading-[22px]">Get in Touch</h4>
                        <a href="#" className="text-[16px] hover:font-[500] leading-[30px]">Question or feedback?</a>
                        <a href="#" className="text-[16px] hover:font-[500] leading-[30px]">We’d love to hear from you</a>
                        <div className="border rounded-[50px] cursor-pointer hover:bg-[#091e4214] w-[140px] flex justify-center items-center space-x-1">
                            <span  className="font-[400] text-[16px] leading-[30px]">Email Address</span>
                            <span  className="fa fa-paper-plane text-[#EB5757] text-[12px] mt-[2px]"></span>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <p className="font-[600] border-t text-[16px] py-2 text-center leading-[22px]">
                    Mazdoor, 2023 © Shahbaz Inc. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
