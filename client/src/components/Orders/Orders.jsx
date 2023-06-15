import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { OrderTable } from './OrderTable';
import loadingGif from "../../assets/gifs/loading.gif"




function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


export const Orders = () => {
    const [value, setValue] = useState(0);
    const user = useSelector((state) => state.mazdoorStore.user);
    const projects= useSelector((state) => state.mazdoorStore.projects);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (user && projects) {
            setLoading(false);
        } else {
            setLoading(true);
        }
    }, [user, projects]);
    

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <section className="px-20 py-10 bg-lightBg2 flex flex-col relative">
            {/* Header */}
            <header className="flex mb-5">
                <h1 className="text-3xl text-lightBlack font-semibold">Manage Orders</h1>
            </header>
            {/* Main */}
            <main>
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
                        value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="OFFERED" {...a11yProps(0)} />
                        <Tab label="ACTIVE" {...a11yProps(1)} />
                        <Tab label="DELIVERED" {...a11yProps(2)} />
                        <Tab label="COMPLETED" {...a11yProps(3)} />
                        <Tab label="CANCELLED" {...a11yProps(4)} />
                        <Tab label="WITHDRAWN" {...a11yProps(5)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <OrderTable tab="OFFERED" user={user} projects={projects["OFFERED"]} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <OrderTable tab="ACTIVE" user={user} projects={projects["ACTIVE"]} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <OrderTable tab="DELIVERED" user={user} projects={projects["DELIVERED"]} />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <OrderTable tab="COMPLETED" user={user} projects={projects["COMPLETED"]} />
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <OrderTable tab="CANCELLED" user={user} projects={projects["CANCELLED"]}/>
                </TabPanel>
                <TabPanel value={value} index={5}>
                    <OrderTable tab="WITHDRAWN" user={user} projects={projects["WITHDRAWN"]}/>
                </TabPanel>

            </main>
            {loading && <div className="popup-overlay !absolute">
                        <div className="popup-container !absolute">
                            <img className="h-[10vw]" src={loadingGif} alt="loading" />
                        </div>
                    </div>}
        </section>
    );
};