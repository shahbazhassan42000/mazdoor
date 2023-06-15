import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updatePopup,loadConversations, loadProjects } from "../../store/mazdoor/mazdoorSlice";
import { useState, useEffect } from "react";
import loadingGif from "../../assets/gifs/loading.gif";
import { NotificationManager } from "react-notifications";
import { InputAdornment, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { apiURL, projectsURL, headers, sendMessageURL } from "../../utils/constants";
import axios from "axios";

export const ProjectOfferDetails = () => {
    const dispatch = useDispatch();
    const popup = useSelector(state => state.mazdoorStore.popup);
    const user = useSelector(state => state.mazdoorStore.user);
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(500);
    const [deliveryTime, setDeliveryTime] = useState(1);
    const [focus, setFocus] = useState(false);

     useEffect(() => {
        if(user && popup) setLoading(false);
     }, [user, popup])
    
    const onSendOffer = (e) => {
        //create project
        const project = {
            seller: user?._id,
            customer: popup?.message?.conversation?.receiver?._id,
            gig: popup?.message?.gig?._id,
            description,
            price,
            deliveryTime
        }
        setLoading(true);
        //create project
        axios.request({
            baseURL: apiURL,
            url: projectsURL,
            method: "post",
            headers,
            data: { project }
        }).then(res => {
            //send project in conversation
            const message = {
                sender: user?._id,
                receiver: popup?.message?.conversation?.receiver?._id,
                message: `___&&&___$$$___${res?.data?._id}_`,
                conversation:popup?.message?.conversation?._id
            }
            axios.request({
                baseURL: apiURL,
                url: sendMessageURL,
                method: "post",
                headers,
                data: { message }
            }).then(res => { 
                //update conversations
                dispatch(loadConversations(user?._id));
                dispatch(updatePopup({ status: false, type: popup.type, message: popup.message }));
                dispatch(loadProjects(user?._id));
                NotificationManager.success("Project created successfully", "SUCCESS!", 5000);

            }).catch(err => {
                console.log(err);
                NotificationManager.error("While creating project, Please try again later", "ERROR!", 5000);
            })
            
        }).catch(err => {
            console.log(err);
            NotificationManager.error("While creating project, Please try again later", "ERROR!", 5000);
        }).finally(() => {
            setLoading(false);
        });
        e.preventDefault();
    }

    const [loading, setLoading] = useState(true);
    return (
        <section className="popup-container text-[#333333] rounded-sm flex flex-col justify-center bg-white w-[650px] relative">
            <i
                onClick={() => dispatch(updatePopup({ status: false, type: popup.type, message: popup.message }))}
                className="fa fa-close absolute top-4 right-4 text-2xl text-lightGray  hover:text-[#333333] cursor-pointer">
            </i>
            {/* Header */}
            <header className="bg-bg rounded-sm border-b p-4">
                <h1 className="text-xl font-bold">Create a Project Offer</h1>
            </header>
            <main className="flex flex-col p-4 gap-4 overflow-y-auto max-h-[500px]">
                {/* Gig title */}
                <h1 className="text-xl font-bold truncate max-w-[600px]">{popup?.message?.gig?.title}</h1>
                {/* Gig image and project description side by side */}
                <div className="flex gap-4 h-[130px]">
                    {/* Gig image */}
                    <div className="w-[320px] h-[130px] rounded-sm">
                        <img className="w-full h-full object-cover rounded-sm" src={popup?.message?.gig?.image} alt="gig" />
                    </div>
                    {/* Project description */}
                    <div className={`h-[130px] flex flex-col w-full rounded-sm border p-4 ${focus && "border-lightGray"}`}>
                        <textarea
                            onFocus={() => setFocus(true)}
                            onBlur={() => setFocus(false)}
                            maxLength={1500}
                            spellCheck={true}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full h-full outline-none resize-none"
                            placeholder="Describe your offer"
                            value={description}>
                        </textarea>
                        {/*  Textarea count*/}
                        <div className="flex w-full justify-end">
                            <span className="text-lightGray">{description?.length}/1500</span>
                        </div>
                    </div>
                </div>
                {/* Project terms */}
                <p className="text-lightGray text-lg font-medium">Define the terms of your offer.</p>
                {/* Project delivery Time and price */}
                <div className="p-4 rounded-sm border flex gap-4">
                    <TextField
                        fullWidth
                        required
                        sx={{
                            "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                                borderColor: "#EB5757" // change focus visible color here
                            }
                            }
                        }}
                        InputLabelProps={{
                            style: { color: "#EB5757" } // change label color here
                        }}
                        label="Price"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">Rs</InputAdornment>,
                            inputProps: {
                            min: 500
                            }
                        }}
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        required
                        sx={{
                            "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                                borderColor: "#EB5757" // change focus visible color here
                            }
                            }
                        }}
                        InputLabelProps={{
                            style: { color: "#EB5757" } // change label color here
                        }}
                        label="Delivery Time"
                        InputProps={{
                            inputProps: {
                            min: 1
                            }
                        }}
                        type="number"
                        value={deliveryTime}
                        helperText="Delivery time in days"
                        onChange={(e) => setDeliveryTime(e.target.value)}
                    />
                </div>
                {/* Send offer button */}
                <div className="flex w-full justify-end">
                    <button
                        onClick={(e)=>onSendOffer(e)}
                        disabled={description?.length < 1 || deliveryTime < 1 || !price}
                        className="flex gap-1 items-center primary-btn">
                        {/*  icon*/}
                        <SendIcon className="-rotate-45" fontSize="small" />
                        {/*  text*/}
                        <span className="text-white text-[14px] font-bold">Send Offer</span>
                    </button>
                </div>
            </main>

            {loading && <div className="popup-overlay !absolute">
            <div className="popup-container !absolute">
              <img className="h-[10vw]" src={loadingGif} alt="loading" />
            </div>
          </div>}
        </section>
    );
};