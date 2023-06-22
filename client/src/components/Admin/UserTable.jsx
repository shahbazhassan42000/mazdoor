import { map } from "lodash";
import { UserMiniCard } from "./UserMiniCard";
import { useEffect, useState } from "react";

export const UserTable = ({ tab, users ,setLoading}) => {
    const [sortedData, setSortedData] = useState(users);
    const [sortOrder, setSortOrder] = useState("asc");
    const [sortedColumn, setSortedColumn] = useState(null);
    const handleHeaderClick = (column) => {

        setLoading(true);
        const newData = [...users];
        newData.sort((a, b) => {
            if (a[column].localeCompare(b[column]) > 0) {
                return sortOrder === "asc" ? 1 : -1;
            } else if (a[column].localeCompare(b[column]) < 0) {
                return sortOrder === "asc" ? -1 : 1;
            } else {
                return 0;
            }
        });
    
        setSortedData(newData);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        setSortedColumn(column);
        setLoading(false);
    };

    useEffect(() => {
        if(users){
            setSortedData(users);
        }
    }, [users]);
    return (
        <section className='bg-white max-h-[150vh] border flex flex-col rounded-sm -mx-6 relative overflow-y-auto'>
            <div className='flex items-center p-4 border-b'>
                <h1 className='text-md text-darkBlack font-semibold uppercase'>{tab} profiles</h1>
            </div>
            <header className="flex px-5 border-b gap-1 py-2 sticky top-0 bg-white z-50">
                <h2
                    onClick={() => handleHeaderClick("name")}
                    className={`text-sm font-semibold text-lightGray w-[160px] cursor-pointer hover:text-darkBlack ${sortedColumn === "name" && "!text-darkBlack"}`}>
                    Name
                    {sortedColumn === "name" && <i className={`fa ml-1 fa-arrow-${sortOrder === "asc" ? "down" : "up"} `}></i>}
                </h2>
                <h2
                    onClick={() => handleHeaderClick("username")}
                    className={`text-sm font-semibold text-lightGray w-[160px] cursor-pointer hover:text-darkBlack ${sortedColumn === "username" && "!text-darkBlack"}`}>
                    Username
                    {sortedColumn === "username" && <i className={`fa ml-1 fa-arrow-${sortOrder === "asc" ? "down" : "up"} `}></i>}
                </h2>
                <h2  className="text-sm font-semibold text-lightGray w-[160px]">CNIC</h2>
                <h2
                    onClick={() => handleHeaderClick("email")}
                    className={`text-sm font-semibold text-lightGray w-[160px] cursor-pointer hover:text-darkBlack ${sortedColumn === "email" && "!text-darkBlack"}`}>
                    Email
                    {sortedColumn === "email" && <i className={`fa ml-1 fa-arrow-${sortOrder === "asc" ? "down" : "up"} `}></i>}
                </h2>
                <h2
                    onClick={() => handleHeaderClick("phone")}
                    className={`text-sm font-semibold text-lightGray w-[160px] cursor-pointer hover:text-darkBlack ${sortedColumn === "phone" && "!text-darkBlack"}`}>
                    Phone
                    {sortedColumn === "phone" && <i className={`fa ml-1 fa-arrow-${sortOrder === "asc" ? "down" : "up"} `}></i>}
                </h2>
                {tab === "LABORS" && <h2 className={`text-sm font-semibold text-lightGray w-[100px]`}>Gigs</h2>}
                <h2 className={`text-sm font-semibold text-lightGray  w-[100px]`}>Projects</h2>
                <h2
                    onClick={() => handleHeaderClick("status")}
                    className={`text-sm font-semibold text-lightGray cursor-pointer hover:text-darkBlack ${sortedColumn === "status" && "!text-darkBlack"}`}>
                    STATUS
                    {sortedColumn === "status" && <i className={`fa ml-1 fa-arrow-${sortOrder === "asc" ? "down" : "up"} `}></i>}
                </h2>
            </header>
            <main className="flex flex-col py-4 gap-4">
                {users ?
                    map(sortedData,(user)=> <UserMiniCard tab={tab} key={user?._id} user={user} />)
                    :
                <div className="text-midBlack">
                        No <span className="lowercase">{tab}</span> to show
                </div>  
                }
            </main>
        </section>
    );
}