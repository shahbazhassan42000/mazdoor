import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GigCardMini } from "../Gig/GigCardMini";
import CloseIcon from "@mui/icons-material/Close";
import { map } from "lodash";

export const SearchBar = () => {

  const labors = useSelector((state) => state.mazdoorStore.labors);
  const [filteredGigs, setFilteredGigs] = useState([]);
  const [search, setSearch] = useState(false);
  const [value, setValue] = useState("");

  const onSearch = (e) => {
    e.preventDefault();
    const gigs = [];
    //search gigs having value in its title or description
    labors.forEach((labor) => {
      labor.gigs.forEach((gig) => {
        if (gig.title.toLowerCase().includes(value.toLowerCase()) || gig.description.toLowerCase().includes(value.toLowerCase())) {
          gigs.push(gig);
        }
      });
    });
    setFilteredGigs(gigs);
  };
  useEffect(() => {
    setSearch(filteredGigs.length > 0);
  }, [filteredGigs]);
  useEffect(() => {
    if (!search) {
      setFilteredGigs([]);
    }
  }, [search]);
  useEffect(() => {
    if (value.trim().length === 0) setFilteredGigs([]);
  }, [value]);
  return (
    <div className="flex flex-col flex-1 relative">
      <div className="flex flex-1">
        <input
          onChange={(e) => {
            setValue(e.target.value);
          }}
          name="searchBar" className="inp w-full h-[40px] !rounded-[6px_0_0_6px] focus-visible:!border-[6px_0_0_6px]"
          placeholder="What services are you looking for today?" type="text" value={value} />
        <button
          onClick={(e) => onSearch(e)}
          className="primary-btn fa fa-search !rounded-[0_6px_6px_0]" disabled={value.trim().length === 0}></button>
      </div>
      {search &&
        <div className="w-full flex absolute bg-white p-[0.5rem] top-[40px] rounded-[0_0_6px_6px] z-40">
          <div className="flex flex-col gap-2 px-3">
            {map(filteredGigs, (gig, index) => <GigCardMini key={index} gig={gig} setSearch={setSearch} />)}
          </div>
          <CloseIcon
            onClick={() => {
              setSearch(false);
              setValue("");
              setFilteredGigs([]);
            }}
            className="mx-3 text-lightBlack hover:text-primary cursor-pointer" />
        </div>
      }
    </div>
  );
};