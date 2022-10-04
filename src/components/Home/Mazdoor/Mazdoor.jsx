import labour from '../../../assets/gifs/WBPi.gif'
import shahbaz from '../../../assets/images/____asmall.jpg'
import m from '../../../assets/images/WhatsApp Image 2022-10-05 at 12.27.29 AM.jpeg'
import MazdoorCard from "./MazdoorCard";


const Mazdoor=()=>{
    return (
        <div className="flex flex-col px-20 mt-[10px]">
            <div className="flex justify-between w-full">
                <div className="flex flex-col w-[55%] pt-[130px]">
                    <p className="actNav text-[18px]">MAZDOORS</p>
                    <h2 className="leading-[60px] font-bold text-[#333333] text-[45px] relative">
                        <span className="absolute rotate-[-25deg] bg-[#F2C94C] w-[14px] h-[14px] rounded-[3px] -top-10 right-40"></span>
                        Labor That is Always available for you
                    </h2>
                </div>
                <div className="pr-[90px] h-[303px]">
                    <img className="object-fill w-[100%] h-[100%]" src={labour} alt="labour standing with clipboard in hands"/>
                </div>
            </div>
            <div className="flex space-x-10 pb-[200px]">
                <MazdoorCard name="Shahbaz Hassan Shahbaz Hassan Shahbaz Hassan Shahbaz Hassan" img={shahbaz} rating="70"/>
                <MazdoorCard name="Shahbaz Hassan" img={shahbaz} rating="89"/>
                <MazdoorCard name="Adee" img={m} rating="69"/>
            </div>
        </div>
    );
}

export default Mazdoor;
