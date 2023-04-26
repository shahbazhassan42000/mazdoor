import upload_icon from "../../assets/icons/profile-upload.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { InputAdornment, MenuItem, TextField } from "@mui/material";
import { map } from "lodash";
import { loadLaborsTypes } from "../../store/mazdoor/mazdoorSlice";
import { citiesURL, statesURL } from "../../utils/constants";
import axios from "axios";

export const ProfileSetting = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.mazdoorStore.user);
  const laborTypes = useSelector((state) => state.mazdoorStore.laborTypes);
  const [upload, setUpload] = useState(false); // for upload icon on hovering over profile image
  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(user.age);
  const [type, setType] = useState(user.type || "");
  const [others, setOthers] = useState("");
  const [startingWage, setStartingWage] = useState(user.startingWage);
  const [phone, setPhone] = useState(user.phone);
  const [CNIC, setCNIC] = useState(user.CNIC);
  const [state, setState] = useState(user.state || "");
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState(user.city || "");
  const [states, setStates] = useState([]);
  const [area,setArea]=useState(user.area || "");
  useEffect(() => {
    dispatch(loadLaborsTypes());
    axios.post(statesURL, {
      country: "Pakistan"
    }).then(res => {
      setStates(res.data.data.states);
    }).catch(err => {
      console.log("ERROR in fetching states");
      console.log(err);
    });
  }, []);
  useEffect(() => {
    if (state) {
      axios.post(citiesURL, {
        country: "Pakistan",
        state
      }).then(res => {
        setCities(res.data.data);
      }).catch(err => {
        console.log("ERROR while fetching cities");
        console.log(err);
      });
    }
  }, [state]);
  return (
    <div className="w-full flex gap-5">
      <div className="flex-1 flex flex-col gap-5">
        <h2 className="text-[22px] font-bold mb-2">Edit Profile</h2>
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
              startAdornment: <InputAdornment position="start">₨</InputAdornment>,
              min: 5
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
      </div>
      <div className="w-[20%]">
        <div
          title={user.username}
          onMouseEnter={() => setUpload(true)}
          onMouseLeave={() => setUpload(false)}
          className="rounded-full overflow-hidden w-[150px] h-[150px] flex justify-center items-center select-none cursor-pointer">
          {upload ?
            <img className="object-cover w-full h-full" src={upload_icon} alt="upload icon" />
            :
            <img className="object-cover w-full h-full" src={user.image} alt="user profile" />
          }
        </div>
      </div>
    </div>
  );
};