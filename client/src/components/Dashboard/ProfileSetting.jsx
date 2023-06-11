import upload_icon from "../../assets/icons/profile-upload.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import easypaisa_logo from "../../assets/icons/easypaisa_logo.png";
import jazzcash_logo from "../../assets/icons/jazzcash_logo.png";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { map } from "lodash";
import { loadLabors, loadLaborsTypes, loadUser, toggleLoading } from "../../store/mazdoor/mazdoorSlice";
import { apiKey, apiURL, citiesURL, imgBBURL, statesURL, updateUserURL } from "../../utils/constants";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { headers } from "../../utils/constants";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import LockIcon from "@mui/icons-material/Lock";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

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
  // state to store the input values
  const [cardNumber, setCardNumber] = useState(user.cardNumber || "");
  const [cardName, setCardName] = useState(user.cardName || "");
  const [expiryDate, setExpiryDate] = useState(user.cardExpiry && (user.cardExpiry.split("/")[1] + "-" + user.cardExpiry.split("/")[0]) || "");
  const [cvv, setCvv] = useState(user.cvv || "");
  const [paymentSelection, setPaymentSelection] = useState(user.paymentMethod || ""); // state to store the payment paymentSelection option
  const [mobAccSelection, setMobAccSelection] = useState(user.mobAccName || "");
  const [mobAccNo, setMobAccNo] = useState(user.mobAccNumber || "");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);


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
    } else user.age = "";
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
    } else user.type = "";
    if (startingWage) user.startingWage = startingWage;
    if (phone && phone !== "923") {
      if (phone.length !== 12) {
        NotificationManager.error("Phone number should be of 9 digits", "ERROR!", 5000, () => {
          alert("callback");
        });
        flag = true;
      }
      user.phone = phone;
    } else user.phone = "";
    if (CNIC) {
      if (CNIC.length !== 13) {
        NotificationManager.error("CNIC number should be of 13 digits", "ERROR!", 5000, () => {
          alert("callback");
        });
        flag = true;
      }
      user.CNIC = CNIC;
    } else user.CNIC = "";

    //validating payment method
    if (paymentSelection === "Card" || paymentSelection === "Both") {
      if (!cardName) {
        NotificationManager.error("Card name is required", "ERROR!", 5000);
        flag = true;
      } else {
        user.cardName = cardName;
      }
      if (!cardNumber) {
        NotificationManager.error("Card number is required", "ERROR!", 5000);
        flag = true;
      } else {
        if (cardNumber.length !== 16) {
          NotificationManager.error("Card number should be of 16 digits", "ERROR!", 5000);
          flag = true;
        } else {
          user.cardNumber = cardNumber;
        }
      }
      if (!expiryDate) {
        NotificationManager.error("Expiry date is required", "ERROR!", 5000);
        flag = true;
      } else {
        //convert from YYYY-MM to MM/YYYY
        let date = expiryDate.split("-");
        user.cardExpiry = date[1] + "/" + date[0];
      }
      if (!cvv) {
        NotificationManager.error("CVV is required", "ERROR!", 5000);
        flag = true;
      } else {
        if (cvv.length !== 3 && cvv.length !== 4) {
          NotificationManager.error("CVV should be of 3 or 4 digits", "ERROR!", 5000);
          flag = true;
        } else {
          user.cvv = cvv;
        }
      }
    } else {
      user.cardName = "";
      setCardName("");
      user.cardNumber = "";
      setCardNumber("");
      user.cardExpiry = "";
      setExpiryDate("");
      user.cvv = "";
      setCvv("");

    }
    if (paymentSelection === "Mobile Account" || paymentSelection === "Both") {
      if (!mobAccSelection) {
        NotificationManager.error("Select atleast one mobile account", "ERROR!", 5000);
        flag = true;
      } else {
        user.mobAccName = mobAccSelection;
        if (!mobAccNo) {
          NotificationManager.error("Mobile account number is required", "ERROR!", 5000);
          flag = true;
        } else {
          if (mobAccNo.length !== 12) {
            NotificationManager.error("Mobile account number should be of 9 digits", "ERROR!", 5000);
            flag = true;
          } else {
            user.mobAccNumber = mobAccNo;
          }
        }
      }
    } else {
      user.mobAccName = "";
      setMobAccSelection("");
      setMobAccSelection("");
      user.mobAccNumber = "";
      setMobAccNo("");
      setMobAccNo("");
    }
    if (paymentSelection === "Card" || paymentSelection === "Mobile Account" || paymentSelection === "Both") {
      user.paymentMethod = paymentSelection;
    } else {
      //removing other fields
      user.paymentMethod = "";
      user.cardName = "";
      user.cardNumber = "";
      user.cardExpiry = "";
      user.cvv = "";
      user.mobAccName = "";
      user.mobAccNumber = "";
      setMobAccSelection("");
    }
    console.log(user);
    if (flag) {
      return;
    }
    if (state) user.state = state;
    else user.state = "";
    if (city) user.city = city;
    else user.city = "";
    if (area) user.area = area;
    else user.area = "";


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
        NotificationManager.error("Error while updating profile", "ERROR!", 5000);
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
      NotificationManager.success("Profile updated successfully", "SUCCESS!", 5000);
      dispatch(loadLabors());
      dispatch(loadLaborsTypes());
    }).catch(err => {
      NotificationManager.error("Error while updating profile", "ERROR!", 5000);
    }).finally(() => {
      dispatch(loadUser());
      dispatch(toggleLoading());
    });
  };
  // function to handle the click on an payment method changing
  const onPaymentMethodClick = (option) => {
    setPaymentSelection(option);
    if (option === user.paymentMethod) {
      if (user.cardName) setName(user.cardName);
      if (user.cardNumber) setCardNumber(user.cardNumber);
      if (user.cardExpiry) setExpiryDate(user.cardExpiry.split("/")[1] + "-" + user.cardExpiry.split("/")[0]);
      if (user.cvv) setCvv(user.cvv);
      if (user.mobAccName) setMobAccSelection(user.mobAccName);
      if (user.mobAccNumber) setMobAccNo(user.mobAccNumber);
    }
  };
  return (
    <div className="w-full flex flex-col gap-10">
      <div className="w-full flex gap-5">
        <div className="flex-1 flex flex-col gap-5">
          <h2 className="text-[22px] font-bold mb-2">Edit Profile</h2>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography>Personal Information</Typography>
            </AccordionSummary>
            <AccordionDetails className="flex flex-col gap-5">
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
                {user?.role === "LABOR" &&<TextField
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
                </TextField>}
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
                  value={phone.substring(3)}
                  helperText="e.g, +923xxxxxxxxx"
                  onChange={e => setPhone("923" + e.target.value)}
                />
                {user?.role === "LABOR" &&<TextField
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
                />}

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
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography>Payment Method</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="flex flex-col items-center p-4">
                <div className="flex justify-between items-center gap-10 mb-10">
                  <p className="text-[#6d6e70] text-sm">Mazdoor uses secure, encrypted technology to store and handle
                    your payment information. Rest assured, the confidential data you enter here is safe.</p>
                  {/* div component with icon and text */}
                  <div
                    className="flex items-center justify-center gap-2 text-[1.2rem] text-white font-bold p-2 rounded-md select-none bg-[#EB5757] opacity-50">
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
                      paymentSelection === "Card" ? "bg-green-100 border-green-500" : ""
                    }`}
                    onClick={() => onPaymentMethodClick(paymentSelection === "Card" ? "" : "Card")}
                  >
                    <CreditCardIcon fontSize="large" />
                    <p className="mt-2 select-none">Card</p>
                    {paymentSelection === "Card" && <CheckCircleIcon color="success" />}
                  </div>
                  {/* Mobile account option */}
                  <div
                    className={`flex flex-col items-center py-4 border rounded-lg cursor-pointer w-[140px] hover:shadow transition-shadow ${
                      paymentSelection === "Mobile Account" ? "bg-green-100 border-green-500" : ""
                    }`}
                    onClick={() => onPaymentMethodClick(paymentSelection === "Mobile Account" ? "" : "Mobile Account")}
                  >
                    <PhoneAndroidIcon fontSize="large" />
                    <p className="mt-2 select-none">Mobile Account</p>
                    {paymentSelection === "Mobile Account" && <CheckCircleIcon color="success" />}
                  </div>
                  {/* Both option */}
                  <div
                    className={`flex flex-col items-center py-4 border rounded-lg cursor-pointer w-[140px] hover:shadow transition-shadow ${
                      paymentSelection === "Both" ? "bg-green-100 border-green-500" : ""
                    }`}
                    onClick={() => onPaymentMethodClick(paymentSelection === "Both" ? "" : "Both")}
                  >
                    <AcUnitIcon fontSize="large" />
                    <p className="mt-2 select-none">Both</p>
                    {paymentSelection === "Both" && <CheckCircleIcon color="success" />}
                  </div>
                </div>
                {/* Conditional rendering of the details based on the paymentSelection option */}
                <div className="flex gap-4">
                  {(paymentSelection === "Card" || paymentSelection === "Both") && (
                    <div className="flex flex-col items-center justify-center gap-5">
                      {/* Card name input field */}
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
                        // tailwind classes for the input field
                        label="Name on Card"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                      />
                      {/* Card number input field */}
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
                          startAdornment: <InputAdornment position="start"><CreditCardIcon /></InputAdornment>,
                          endAdornment: <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>,
                          inputProps: {
                            max: 9999999999999999,
                            min: 0
                          }
                        }}
                        // tailwind classes for the input field
                        label="Card Number"
                        value={cardNumber}
                        type={showPassword ? "number" : "password"}
                        onChange={(e) => setCardNumber(e.target.value)}
                      />
                      {/* Expiry date and cvv input fields */}
                      <div className="flex w-full justify-between gap-2">
                        <TextField
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "&.Mui-focused fieldset": {
                                borderColor: "#EB5757" // change focus visible color here
                              }
                            }
                          }}
                          InputLabelProps={{
                            shrink: true,
                            style: { color: "#EB5757" } // change label color here
                          }}
                          label="Expiry Date (MM/YYYY)"
                          value={expiryDate}
                          type="month"
                          onChange={(e) => {
                            setExpiryDate(e.target.value);
                            console.log(e.target.value);
                          }}
                        />
                        <TextField
                          type="number"
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
                              max: 99999,
                              min: 0
                            }
                          }}
                          label="CVV"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                  {(paymentSelection === "Mobile Account" || paymentSelection === "Both") && (
                    <div className="flex flex-col items-center gap-5 justify-between">
                      {/* Your mobile account details here */}
                      <div className="flex gap-5">
                        {/*easypaisa option*/}
                        <div
                          className={`flex justify-center items-center border rounded-lg cursor-pointer w-[140px] hover:shadow transition-shadow ${
                            mobAccSelection === "Easypaisa" ? "bg-green-100 border-green-500" : ""
                          }`}
                          onClick={() => setMobAccSelection(mobAccSelection === "Easypaisa" ? "" : "Easypaisa")}
                        >
                          <div className="px-2 w-[120px]">
                            <img className="w-full h-full object-cover" src={easypaisa_logo} alt="easypaisa" />
                          </div>
                          {mobAccSelection === "Easypaisa" && <CheckCircleIcon color="success" />}
                        </div>
                        {/*jazzcash option*/}
                        <div
                          className={`flex items-center border rounded-lg cursor-pointer w-[140px] hover:shadow transition-shadow ${
                            mobAccSelection === "Jazzcash" ? "bg-green-100 border-green-500" : ""
                          }`}
                          onClick={() => setMobAccSelection(mobAccSelection === "Jazzcash" ? "" : "Jazzcash")}
                        >
                          <div className="p-2 w-[120px]">
                            <img className="w-full h-full object-cover" src={jazzcash_logo} alt="jazzcash" />
                          </div>
                          {mobAccSelection === "Jazzcash" && <CheckCircleIcon color="success" />}
                        </div>
                      </div>
                      {/* Mobile account number input field */}
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
                        label="Mobile Account Number"
                        type="number"
                        value={mobAccNo.substring(3)}
                        onChange={e => setMobAccNo("923" + e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </div>
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
