import labour from "../../../assets/gifs/WBPi.gif";
import LaborCard from "./LaborCard";
import { useSelector } from "react-redux";
import { useState } from "react";
import { map } from "lodash";


const Labor=()=>{

    const allMazdoors=useSelector(state => state.mazdoorStore.labors);
    const [index,setIndex]=useState(0);
    const mazdoors=allMazdoors.slice(index,index+8);
    return (
        <div id="mazdoors" className="flex flex-col px-20 mt-[10px]">
            <div className="flex justify-between w-full">
                <div className="flex flex-col w-[55%] pt-[130px]">
                    <p className="actNav text-[18px]">MAZDOORS</p>
                    <h2 className="leading-[60px] font-bold text-[#333333] text-[45px] relative">
                        <span

                            className="absolute rotate-[-25deg] bg-[#F2C94C] w-[14px] h-[14px] rounded-[3px] -top-10 right-40">
                        </span>
                        Labor That is Always available for you
                    </h2>
                </div>
                <div className="pr-[90px] h-[303px]">
                    <img className="object-fill w-[100%] h-[100%]" src={labour} alt="labour standing with clipboard in hands"/>
                </div>
            </div>
            <div className="flex items-center">
                <span
                    onClick={()=>{setIndex(index-8<0?index-8+allMazdoors.length:index-8)}}
                    className="fa fa-angle-left h-[64px] w-[64px] flex items-center justify-center bg-[#E0E0E0] hover:bg-[#EB5757] hover:text-white cursor-pointer rounded-[50%]">
                </span>
                <div className="flex flex-wrap w-[90%] justify-center">
                    {map(mazdoors,(mazdoor,index)=>{
                        return <LaborCard key={index} mazdoor={mazdoor} />
                    })}
                </div>
                <span
                    onClick={()=>{setIndex((index+8)%allMazdoors.length)}}
                    className="fa fa-angle-right h-[64px] w-[64px] flex items-center justify-center bg-[#E0E0E0] hover:bg-[#EB5757] hover:text-white cursor-pointer rounded-[50%]">
                </span>
            </div>
        </div>
    );
}

export default Labor;
