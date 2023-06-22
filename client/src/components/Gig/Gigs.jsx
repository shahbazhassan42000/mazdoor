import { GigCarousal } from "./GigCarousal";
import { useSelector } from "react-redux";

export const Gigs = () => {

  const gigs = useSelector((state) => state.mazdoorStore.gigs);

  return (
    <section className="flex flex-col px-20 gap-10">
      <h1 className="text-midBlack font-bold text-2xl">
        Gigs
      </h1>
      <section className="w-full pb-20">
        {gigs?.length > 0 && <GigCarousal gigs={gigs} count={25} cols={4} type="full" />}
      </section>
    </section>
  )
}