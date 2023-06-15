import { OrderMiniCard } from "./OrderMiniCard";
import { map } from "lodash";

export const OrderTable = ({ tab, user, projects }) => {
    return (
        <section className='bg-white max-h-[90vh] border flex flex-col rounded-sm -mx-6 relative'>
            <div className='flex items-center p-4 border-b'>
                <h1 className='text-md text-darkBlack font-semibold uppercase'>{tab} orders</h1>
            </div>
            <header className="flex border-b px-8 py-2 sticky top-0">
                <h2 className="text-sm font-semibold text-lightGray w-[15%]">{user?.role==="LABOR"?"BUYER":"SELLER"}</h2>
                <h2 className="text-sm font-semibold text-lightGray w-[40%]">GIG</h2>
                <h2 className="text-sm font-semibold text-lightGray w-[15%]">DUE ON</h2>
                <h2 className="text-sm font-semibold text-lightGray w-[10%]">TOTAL</h2>
                <h2 className="text-sm font-semibold text-lightGray w-[20%]">STATUS</h2>
            </header>
            <main className="p-4 flex flex-col">
                {projects ?
                    map(projects, (project) => <OrderMiniCard project={project} user={user} />)
                    :
                <div className="text-midBlack">
                        No <span className="lowercase">{tab}</span> orders to show
                </div>  
                }
            </main>
        </section>
    );
}