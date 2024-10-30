import { Button } from "primereact/button";
import PostTweet from "../components/PostTweet";
import TweetList from "../components/TweetList";
import { useNavigate } from "react-router-dom";
import { Auth } from "../services/Api";


function HomePage() {
    const userRole = Auth.user().role;
    const navigate = useNavigate();
    return (
        <>
        {userRole === 'ADMIN' ? (<Button label="Denuncias" icon="pi pi-twitter" onClick={() => navigate('/bloqueados') } />):null}
        <PostTweet/>
        <div>
        <TweetList/>
        </div>
        </>
    );
}

export default HomePage;
