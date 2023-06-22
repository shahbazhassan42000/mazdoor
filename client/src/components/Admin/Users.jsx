import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import loadingGif from "../../assets/gifs/loading.gif"
import { a11yProps, TabPanel } from '../../utils/helpers';
import { UserTable } from './UserTable';


export const Users = () => {
    const [value, setValue] = useState(0);
    const user = useSelector((state) => state.mazdoorStore.user);
    const users= useSelector((state) => state.mazdoorStore.users);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (user && users) {
            setLoading(false);
        } else {
            setLoading(true);
        }
    }, [user, users]);
    

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <section className="px-20 py-10 bg-lightBg2 flex flex-col">
            {/* Header */}
            <header className="flex mb-5">
                <h1 className="text-3xl text-lightBlack font-semibold">Manage Users</h1>
            </header>
            {/* Main */}
            <main className='relative'>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        sx={{
                            ".MuiTabs-indicator": {
                                backgroundColor: `#EB5757`,
                            },
                            ".Mui-selected": {
                                color: `#EB5757 !important`,
                            }

                        }}
                        value={value} onChange={handleChange} aria-label="users-managing">
                        <Tab label={`LABORS [${users?.LABOR ?users?.LABOR?.length : 0}]`} {...a11yProps(0)} />
                        <Tab label={`CUSTOMERS [${users?.CUSTOMER ?users?.CUSTOMER?.length : 0}]`} {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <UserTable tab="LABORS" user={user} users={users?.LABOR} setLoading={setLoading} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <UserTable tab="CUSTOMER" users={users?.CUSTOMER} setLoading={setLoading} />
                </TabPanel>
            
             {loading && <div className="popup-overlay !absolute">
                    <div className="popup-container !absolute">
                        <img className="h-[10vw]" src={loadingGif} alt="loading" />
                    </div>
                </div>
            }
            </main>
        </section>
    );
};