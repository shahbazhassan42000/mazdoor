import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updatePopup } from "../../store/mazdoor/mazdoorSlice";
import { useState, useEffect } from "react";
import loadingGif from "../../assets/gifs/loading.gif";
import {map} from "lodash";

export const ProjectOffer = () => {

    const dispatch = useDispatch();
    const popup = useSelector(state => state.mazdoorStore.popup);
    const user = useSelector(state => state.mazdoorStore.user);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        if(user && popup) setLoading(false);
    },[user,popup])
    
    return (
        <section className="popup-container text-[#333333] rounded-sm flex flex-col justify-center bg-white w-[650px] relative">
            <i
                onClick={() => dispatch(updatePopup({ status: false, type: popup.type, message: popup.message }))}
                className="fa fa-close absolute top-4 right-4 text-2xl text-lightGray  hover:text-[#333333] cursor-pointer">
            </i>
            {/* Header */}
            <header className="bg-bg rounded-sm border-b p-4">
                <h1 className="text-xl font-bold">Select a Gig</h1>
            </header>
            <main className="flex flex-col p-4 gap-4 overflow-y-auto max-h-[400px]">
                {user &&
                    map(user?.gigs, (gig, index) => { 
                        return (
                            <div
                                onClick={() => dispatch(updatePopup({ status: true, type: "offerDetails", message: {conversation:popup?.message?.conversation,gig} }))}
                                key={gig?._id}
                                className="cursor-pointer p-4 border hover:border-primary rounded-sm flex gap-4">
                                {/* Gig Image */}
                                <div className="w-[100px] h-[50px] rounded-sm">
                                    <img className="w-full h-full object-cover rounded-sm" src={gig?.image} alt="gig" />
                                </div>
                                {/* Gig title */}
                                <div className="flex flex-col justify-center">
                                    <h1 className="text-lg font-bold truncate max-w-[450px]">{gig?.title}</h1>
                                </div>
                            </div>
                        );
                    })
                }
            </main>
            {loading && <div className="popup-overlay !absolute">
            <div className="popup-container !absolute">
              <img className="h-[10vw]" src={loadingGif} alt="loading" />
            </div>
          </div>}
        </section>
    );
};