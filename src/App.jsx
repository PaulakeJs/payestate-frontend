import { useSelector } from "react-redux";
import Header from "./Components/Header";
import Proctected from "./Components/Proctected";
import Spinner from "./Components/Spinner";
import Home from "./Pages/Home";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import "./w3.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashbord from "./Pages/Dashbord";
import NewListing from "./Pages/listing/NewListing";
import { EditListing } from "./apicalls/listings";
import EditListings from "./Pages/listing/Edit-Listing";
import ListingDelete from "./Pages/listing/ListingDelete";
import EditAccount from "./Pages/EditAccount";
import ListingInfo from "./Pages/listing/ListingInfo";
import General from "./Pages/listing/General";
import Admin from "./Pages/admin/Admin";
import SearchResults from "./Pages/listing/SearchResults";

function App() {
  const { loading } = useSelector((state) => state.loaders);
  return (
    <>
      {loading && <Spinner />}
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <Proctected>
                <Home />
              </Proctected>
            }
          />
          <Route path="/explore" element={<General />} />
          <Route
            path="/account/dashbord"
            element={
              <Proctected>
                <Dashbord />
              </Proctected>
            }
          />
          <Route
            path="/account/admin"
            element={
              <Proctected>
                <Admin />
              </Proctected>
            }
          />
          <Route
            path="/listing/:id"
            element={
              <Proctected>
                <ListingInfo />
              </Proctected>
            }
          />
          <Route
            path="/account/dashbord/edit-account/:id"
            element={
              <Proctected>
                <EditAccount />
              </Proctected>
            }
          />

          <Route
            path="/search-results"
            element={
              <Proctected>
                <SearchResults />
              </Proctected>
            }
          />
          <Route
            path="/account/dashbord/delete/:id"
            element={
              <Proctected>
                <ListingDelete />
              </Proctected>
            }
          />
          <Route
            path="account/dashbord/edit/:id"
            element={
              <Proctected>
                <EditListings />
              </Proctected>
            }
          />
          <Route
            path="/account/dashbord/new-listing"
            element={
              <Proctected>
                <NewListing />
              </Proctected>
            }
          />
          <Route path="/account/signin" element={<Signin />} />
          <Route path="/account/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
