import womanSitting from "../../assets/icons/1.png";
import free from "../../assets/icons/2.png";
import waiters from "../../assets/icons/3.png";

const Services=()=>{
    return (
        <div id="services" className="px-20 pt-[8.78vw] flex flex-col items-center">
            <p className="actNav text-[18px] relative">
                <span className="absolute rotate-[-25deg] bg-[#EB5757] w-[12px] h-[12px] rounded-[3px] bottom-28 left-44"></span>
                WHAT WE SERVE
            </p>
            <h2 className="text-center leading-[60px] font-bold text-[#333333] text-[45px] relative">
                <span className="absolute rotate-[-25deg] bg-[#EB5757] w-[14px] h-[14px] rounded-[3px] top-20 -left-32"></span>
                <span className="absolute rotate-[-25deg] bg-[#F2C94C] w-[14px] h-[14px] rounded-[3px] top-8 -right-32"></span>
                Your Favorite Labor<br/>Finding Partner
            </h2>
            <div className="flex space-x-10 pt-10 w-full justify-between">
                <div className="flex flex-col  w-[23%] items-center">
                    <div className="w-[246px] h-[230px]">
                        <img className="object-fill w-[100%] w-[100%]" src={womanSitting}
                             alt="woman sitting on couch and using her mobile"
                        />
                    </div>
                    <h3 className="font-bold text-[28px] leading-[70px]">Easy To Access</h3>
                    <p className="text-[18px] font-[500] text-center leading-[30px] text-[#333333]">
                        You only need a few steps in getting Labor at doorstep
                    </p>
                </div>
                <div className="flex flex-col  w-[23%] items-center">
                    <div className="w-[246px] h-[230px] flex justify-center items-center">
                        <img className="object-fill w-[50%] w-[50%]" src={free} alt="free of cost"/>
                    </div>
                    <h3 className="font-bold text-[28px] leading-[70px] relative">
                        <span className="absolute bg-[#EB5757] w-[14px] h-[14px] rounded-[50%] -top-3 left-72"></span>
                        Free of Cost
                    </h3>
                    <p className="text-[18px] font-[500] text-center leading-[30px] text-[#333333]">
                        No Middle man charges this process is totally Free.
                    </p>
                </div>
                <div className="flex flex-col  w-[23%] items-center">
                    <div className="w-[246px] h-[230px]">
                        <img className="object-fill w-[100%] w-[100%]" src={waiters}
                             alt="waiting standing picking dishes"
                        />
                    </div>
                    <h3 className="font-bold text-[28px] leading-[70px]">Best Quality</h3>
                    <p className="text-[18px] font-[500] text-center leading-[30px] text-[#333333]">Not only fast for us quality is also number one</p>
                </div>
            </div>
        </div>
    );
}

export default Services;
