import FilterBar from "../../components/events/FilterBar";
// import HeroSection from "../../components/events/HeroSection";
import AvailableEvents from "../../components/events/AvailableEvents";
function EventList() {
  return (
    <>
      <FilterBar />
      <AvailableEvents />
      {/* <HeroSection /> */}
    </>
  );
}

export default EventList;