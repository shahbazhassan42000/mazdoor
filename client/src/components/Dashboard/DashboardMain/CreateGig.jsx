import upload_icon from "../../../assets/images/gig-placeholder-hover.png";
import gig_placeholder from "../../../assets/images/gig-placeholder.png";
import { useEffect, useRef, useState } from "react";
import { InputAdornment, MenuItem, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { map } from "lodash";
import { NotificationManager } from "react-notifications";
import axios from "axios";
import { apiKey, apiURL, createGigURL, imgBBURL } from "../../../utils/constants";
import { loadLabors, loadLaborsTypes, loadUser, toggleLoading } from "../../../store/mazdoor/mazdoorSlice";
import { headers } from "../../../utils/constants";

export const CreateGig = () => {
  const user = useSelector((state) => state.mazdoorStore.user);
  const dispatch = useDispatch();
  const imgUpload = useRef(null);
  const [image, setImage] = useState(gig_placeholder);
  const [imageFile, setImageFile] = useState(null);
  const [upload, setUpload] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(500);
  const [deliveryTime, setDeliveryTime] = useState(1);
  const [area, setArea] = useState("");
  const laborTypes = useSelector((state) => state.mazdoorStore.laborTypes);
  const [others, setOthers] = useState("");

  const onCreateGig = (e) => {
    e.preventDefault();
    let flag = false;
    if (!imageFile) {
      NotificationManager.error("Please upload gig image", "ERROR!", 5000);
      flag = true;
    }
    if (!title) {
      NotificationManager.error("Please enter gig title", "ERROR!", 5000);
      flag = true;
    }
    if (!description) {
      NotificationManager.error("Please enter gig description", "ERROR!", 5000);
      flag = true;
    }
    if (!category) {
      NotificationManager.error("Please select gig category", "ERROR!", 5000);
      flag = true;
    } else {
      if (category === "Others" && !others) {
        NotificationManager.error("Please enter gig category", "ERROR!", 5000, () => {
          alert("callback");
        });
        flag = true;
      }
    }
    if (!price) {
      NotificationManager.error("Please enter gig price", "ERROR!", 5000);
      flag = true;
    }
    if (!deliveryTime) {
      NotificationManager.error("Please enter gig delivery time", "ERROR!", 5000);
      flag = true;
    }
    if (!area) {
      NotificationManager.error("Please enter gig area", "ERROR!", 5000);
      flag = true;
    }
    if (flag) {
      return;
    }
    console.log("Gig Creating...");

    dispatch(toggleLoading());
    //upload image
    const payload = new FormData();
    payload.append("image", imageFile);
    axios.post(imgBBURL + "?key=" + apiKey, payload)
      .then(res => {
        const img = res.data.data.image.url;
        setImage(img);
        //create gig
        const gig = {
          title,
          description,
          category: category === "Others" ? others : category,
          price,
          deliveryTime,
          area,
          image: img,
          user: user._id
        };
        console.log(gig);
        //sending request to server
        axios.request({
          baseURL: apiURL,
          url: createGigURL,
          method: "post",
          headers,
          data: { gig }
        }).then(res => {
          NotificationManager.success("Gig created successfully", "SUCCESS!", 0);
          dispatch(loadUser());
          dispatch(loadLabors());
          dispatch(loadLaborsTypes());

          //rest values
          setImage(gig_placeholder);
          setImageFile(null);
          setTitle("");
          setDescription("");
          setCategory("");
          setPrice(500);
          setDeliveryTime(1);
          setArea("");
          setOthers("");
        }).catch(err => {
          NotificationManager.error(err.request.response, "ERROR!", 5000);
        });

      }).catch(err => {
      NotificationManager.error("Error while creating gig, Please try again later", "ERROR!", 5000);
    }).finally(() => {
      dispatch(toggleLoading());
    });

  };


  useEffect(() => { //set uploaded image url
    if (imageFile) {
      setImage(URL.createObjectURL(imageFile));
    }
  }, [imageFile]);
  return (
    <section className="px-20 flex flex-col justify-center gap-10">
      <h1 className="heading-1 text-center">Create Gig</h1>
      <form className="flex gap-10">
        {/*  Gig Image*/}
        <div>
          <div
            title={"Gig Image"}
            onClick={() => imgUpload.current.click()}
            onMouseEnter={() => setUpload(true)}
            onMouseLeave={() => setUpload(false)}
            className="rounded-md overflow-hidden w-[300px] h-[300px] flex justify-center items-center select-none cursor-pointer">
            {upload ?
              <img className="object-cover w-full h-full" src={upload_icon} alt="upload icon" />
              :
              <img className="object-cover w-full h-full" src={image} alt="gig image" />
            }
            <input
              required
              ref={imgUpload}
              onChange={e => setImageFile(e.target.files[0])}
              className="hidden" name="image"
              type="file" accept="image/jpeg, image/jpg, image/png"
            />
          </div>
        </div>
        {/*  Gig information*/}
        <div className="flex flex-col gap-5 flex-1">
          <TextField
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#EB5757" // change focus visible color here
                }
              }
            }}
            required
            onChange={e => setTitle(e.target.value)}
            InputLabelProps={{
              style: { color: "#EB5757" } // change label color here
            }}
            label="Title"
            placeholder="I will do something I'm really good at ..."
            value={title}
          />
          <TextField
            required
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#EB5757" // change focus visible color here
                }
              }
            }}
            multiline
            rows={4}
            onChange={e => setDescription(e.target.value)}
            InputLabelProps={{
              style: { color: "#EB5757" } // change label color here
            }}
            label="Description"
            value={description}
          />
          <TextField
            required
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#EB5757" // change focus visible color here
                }
              }
            }}
            label="Area"
            InputLabelProps={{
              style: { color: "#EB5757" } // change label color here
            }}
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />
          <div className="flex gap-5">
            <TextField
              required
              fullWidth
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
              select
              value={category}
              onChange={e => setCategory(e.target.value)}
              label="Category"
              helperText="Please select gig cateogry"
            >
              {map(laborTypes, (laborType) => (
                <MenuItem key={laborType} value={laborType}>
                  {laborType}
                </MenuItem>
              ))}
            </TextField>
            {category === "Others" &&
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
                label="Others"
                helperText="Please write gig type/category"
                InputLabelProps={{
                  style: { color: "#EB5757" } // change label color here
                }}
                value={others}
                onChange={(e) => setOthers(e.target.value)}
              />
            }
          </div>
          <div className="flex gap-5">
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
        </div>
      </form>
      <div
        onClick={e => onCreateGig(e)}
        className="flex justify-center">
        <button className="primary-btn">Create Gig</button>
      </div>
    </section>
  );
};