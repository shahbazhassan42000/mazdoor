import upload_icon from "../../assets/icons/profile-upload.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
  Card,
  Box,
  CardContent
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { map } from "lodash";
import { loadLaborsTypes, loadUser, toggleLoading } from "../../store/mazdoor/mazdoorSlice";
import { apiKey, apiURL, citiesURL, imgBBURL, statesURL, updateUserURL } from "../../utils/constants";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { headers } from "../../utils/constants";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import LockIcon from '@mui/icons-material/Lock';


export const ProfileSetting = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.mazdoorStore.user);
  const laborTypes = useSelector((state) => state.mazdoorStore.laborTypes);
  const [upload, setUpload] = useState(false); // for upload icon on hovering over profile image
  const [name, setName] = useState(user.name || "");
  const [age, setAge] = useState(user.age || "");
  const [type, setType] = useState(user.type || "");
  const [others, setOthers] = useState("");
  const [startingWage, setStartingWage] = useState(user.startingWage || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [CNIC, setCNIC] = useState(user.CNIC || "");
  const [state, setState] = useState(user.state || "");
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState(user.city || "");
  const [states, setStates] = useState([]);
  const [area, setArea] = useState(user.area || "");
  const [image, setImage] = useState(user.image || "");
  const [imageFile, setImageFile] = useState(null);
  const imgUpload = useRef(null);

  useEffect(() => { //set uploaded image url
    if (imageFile) {
      setImage(URL.createObjectURL(imageFile));
    }
  }, [imageFile]);

  useEffect(() => { // load states and labor types
    dispatch(loadLaborsTypes());
    axios.post(statesURL, {
      country: "Pakistan"
    }).then(res => {
      setStates(res.data.data.states);
    });
  }, []);
  useEffect(() => { // load cities
    if (state) {
      axios.post(citiesURL, {
        country: "Pakistan",
        state
      }).then(res => {
        setCities(res.data.data);
      });
    }
  }, [state]);

  const onUpdateProfile = (USER) => {
    const user = { ...USER };
    if (name) user.name = name;
    else delete user.name;
    let flag = false;
    if (age) {
      if (age < 0) {
        NotificationManager.error("Age should not be negative", "ERROR!", 5000, () => {
          alert("callback");
        });
        flag = true;
      }
      user.age = age;
    } else delete user.age;
    if (type) {
      if (type === "Others") {
        if (!others) {
          NotificationManager.error("You must need to provide a type/category", "ERROR!", 5000, () => {
            alert("callback");
          });
          flag = true;
        }
        user.type = others;
      } else user.type = type;
    } else delete user.type;
    if (startingWage) user.startingWage = startingWage;
    if (phone) {
      if (phone.length !== 9) {
        NotificationManager.error("Phone number should be of 9 digits", "ERROR!", 5000, () => {
          alert("callback");
        });
        flag = true;
      }
      user.phone = phone;
    } else delete user.phone;
    if (CNIC) {
      if (CNIC.length !== 13) {
        NotificationManager.error("CNIC number should be of 13 digits", "ERROR!", 5000, () => {
          alert("callback");
        });
        flag = true;
      }
      user.CNIC = CNIC;
    } else delete user.CNIC;
    if (flag) {
      return;
    }
    if (state) user.state = state;
    else delete user.state;
    if (city) user.city = city;
    else delete user.city;
    if (area) user.area = area;
    else delete user.area;
    dispatch(toggleLoading());
    if (imageFile) {
      const payload = new FormData();
      payload.append("image", imageFile);
      axios.post(imgBBURL + "?key=" + apiKey, payload)
        .then(res => {
          const img = res.data.data.image.url;
          setImage(img);
          user.image = img;
          updateUser(user);
        }).catch(err => {
        NotificationManager.error("Error while updating profile", "ERROR!", 5000, () => {
          alert("callback");
        });
        dispatch(toggleLoading());
      });
    } else {
      updateUser(user);
    }
  };
  const updateUser = (user) => {
    axios.request({
      baseURL: apiURL,
      url: updateUserURL,
      method: "put",
      headers,
      data: { user }
    }).then(res => {
      NotificationManager.success("Profile updated successfully", "SUCCESS!", 5000, () => {
        alert("callback");
      });
      dispatch(loadUser());
    }).catch(err => {
      NotificationManager.error("Error while updating profile", "ERROR!", 5000, () => {
        alert("callback");
      });
    }).finally(() => {
      dispatch(toggleLoading());
    });
  };

  const [selected, setSelected] = useState("card"); // state to store the selected option

  // function to handle the click on an option
  const handleClick = (option) => {
    setSelected(option);
  };

  return (
    <div className="w-full flex flex-col gap-10">
      <div className="w-full flex gap-5">
        <div className="flex-1 flex flex-col gap-5">
          <h2 className="text-[22px] font-bold mb-2">Edit Profile</h2>
          <Accordion >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography>Personal Information</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className="flex-1 flex flex-col gap-5">
                <div className="w-full flex gap-5 justify-between">
                  <TextField
                    fullWidth
                    InputProps={{
                      readOnly: true
                    }}
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
                    label="Username"
                    defaultValue={user.username}
                  />
                  <TextField
                    fullWidth
                    InputProps={{
                      readOnly: true
                    }}
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
                    label="Email"
                    defaultValue={user.email}
                  />
                </div>
                {/*Name, Age, Type amd Starting Wage*/}
                <div className="w-full flex gap-5 justify-between">
                  <TextField
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                          borderColor: "#EB5757" // change focus visible color here
                        }
                      }
                    }}
                    label="Name"
                    InputLabelProps={{
                      style: { color: "#EB5757" } // change label color here
                    }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <TextField
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
                    inputProps={{ min: 5 }}
                    label="Age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                  <TextField
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
                    value={type}
                    onChange={e => setType(e.target.value)}
                    label="Type"
                    defaultValue="Mazdoor"
                    helperText="Please select your category"
                  >
                    {map(laborTypes, (laborType) => (
                      <MenuItem key={laborType} value={laborType}>
                        {laborType}
                      </MenuItem>
                    ))}
                  </TextField>
                  {type === "Others" &&
                    <TextField
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&.Mui-focused fieldset": {
                            borderColor: "#EB5757" // change focus visible color here
                          }
                        }
                      }}
                      label="Others"
                      helperText="Please write your type/category"
                      InputLabelProps={{
                        style: { color: "#EB5757" } // change label color here
                      }}
                      value={others}
                      onChange={(e) => setOthers(e.target.value)}
                    />
                  }


                </div>
                {/*Phone and CNIC*/}
                <div className="w-full flex gap-5 justify-between">
                  <TextField
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
                    InputProps={{
                      startAdornment: <InputAdornment position="start">+923</InputAdornment>,
                      inputProps: {
                        maxLength: 9,
                        minLength: 9,
                        min: 0
                      }
                    }}
                    label="Contact No."
                    type="number"
                    value={phone}
                    helperText="e.g, +923xxxxxxxxx"
                    onChange={e => setPhone(e.target.value)}
                  />
                  <TextField
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
                    label="Starting Wage"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">Rs</InputAdornment>,
                      inputProps: {
                        min: 0
                      }
                    }}
                    type="number"
                    value={startingWage}
                    onChange={(e) => setStartingWage(e.target.value)}
                  />

                  <TextField
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
                    InputProps={{
                      inputProps: {
                        maxLength: 13,
                        minLength: 13,
                        min: 0
                      }
                    }}
                    label="CNIC"
                    type="number"
                    value={CNIC}
                    helperText="without dashes*"
                    onChange={e => setCNIC(e.target.value)}
                  />
                </div>
                {/*State and city*/}
                <div className="w-full flex gap-5 justify-between">
                  <TextField
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
                    value={state}
                    onChange={e => setState(e.target.value)}
                    label="State"
                  >
                    {states &&
                      map(states, (s) => (
                        <MenuItem key={s.state_code} value={s.name}>
                          {s.name}
                        </MenuItem>
                      ))}
                  </TextField>
                  {state &&
                    <TextField
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
                      value={city}
                      onChange={e => setCity(e.target.value)}
                      label="City"
                    >
                      {map(cities, (s) => (
                        <MenuItem key={s} value={s}>
                          {s}
                        </MenuItem>
                      ))}
                    </TextField>
                  }
                </div>
                <div className="w-full flex gap-5 justify-between">
                  {city &&
                    <TextField
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
                  }
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography>Payment Method</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <div className="flex flex-col items-center p-4">
                  <div className="flex justify-between items-center gap-10 mb-10">
                    <p className="text-[#6d6e70] text-sm">Mazdoor uses secure, encrypted technology to store and handle your payment information. Rest assured, the confidential data you enter here is safe.</p>
                    {/* Box component with icon and text */}
                    <div className="flex items-center justify-center gap-2 text-[1.2rem] text-white font-bold p-2 rounded-md select-none bg-[#EB5757] opacity-50">
                      {/* Lock icon */}
                      <LockIcon fontSize="large" />
                      {/* Text */}
                      <p className="text-xs font-bolds">
                        THIS IS A SECURE PAGE
                      </p>
                    </div>
                  </div>
                  <h1 className="text-2xl font-bold mb-4">Select a Payment Method</h1>
                  <div className="flex gap-4 mb-4">
                    {/* Card option */}
                    <div
                      className={`flex flex-col items-center py-4 border rounded-lg cursor-pointer w-[140px] hover:shadow transition-shadow ${
                        selected === "card" ? "bg-green-100 border-green-500" : ""
                      }`}
                      onClick={() => handleClick("card")}
                    >
                      <CreditCardIcon fontSize="large" />
                      <p className="mt-2">Card</p>
                      {selected === "card" && <CheckCircleIcon color="success" />}
                    </div>
                    {/* Mobile account option */}
                    <div
                      className={`flex flex-col items-center py-4 border rounded-lg cursor-pointer w-[140px] hover:shadow transition-shadow ${
                        selected === "mobile" ? "bg-green-100 border-green-500" : ""
                      }`}
                      onClick={() => handleClick("mobile")}
                    >
                      <PhoneAndroidIcon fontSize="large" />
                      <p className="mt-2">Mobile Account</p>
                      {selected === "mobile" && <CheckCircleIcon color="success" />}
                    </div>
                    {/* Both option */}
                    <div
                      className={`flex flex-col items-center py-4 border rounded-lg cursor-pointer w-[140px] hover:shadow transition-shadow ${
                        selected === "both" ? "bg-green-100 border-green-500" : ""
                      }`}
                      onClick={() => handleClick("both")}
                    >
                      <AcUnitIcon fontSize="large" />
                      <p className="mt-2">Both</p>
                      {selected === "both" && <CheckCircleIcon color="success" />}
                    </div>
                  </div>
                  {/* Conditional rendering of the details based on the selected option */}
                  <div className="flex gap-4">
                    {selected === "card" && (
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="h5">Card Details</Typography>
                          {/* Your card details here */}
                        </CardContent>
                      </Card>
                    )}
                  </div>
                  {selected === "mobile" && (
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="h5">Mobile Account Details</Typography>
                        {/* Your mobile account details here */}
                      </CardContent>
                    </Card>
                  )}
                  {selected === "both" && (
                    <div className="flex gap-4">
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="h5">Card Details</Typography>
                          {/* Your card details here */}
                        </CardContent>
                      </Card>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="h5">Mobile Account Details</Typography>
                          {/* Your mobile account details here */}
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className="w-[20%]">
          <div
            title={user.username}
            onClick={() => imgUpload.current.click()}
            onMouseEnter={() => setUpload(true)}
            onMouseLeave={() => setUpload(false)}
            className="rounded-full overflow-hidden w-[150px] h-[150px] flex justify-center items-center select-none cursor-pointer">
            {upload ?
              <img className="object-cover w-full h-full" src={upload_icon} alt="upload icon" />
              :
              <img className="object-cover w-full h-full" src={image} alt="user profile" />
            }
            <input
              ref={imgUpload}
              onChange={e => setImageFile(e.target.files[0])}
              className="hidden" name="image"
              type="file" accept="image/jpeg, image/jpg, image/png"
            />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center items-center">
        <button
          onClick={() => onUpdateProfile(user)}
          className="primary-btn">Update Profile
        </button>
      </div>
      ;
    </div>
  )
    ;
};
