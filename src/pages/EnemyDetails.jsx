import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

Button

function EnemyDetails() {
    const navigate = useNavigate();

    return (
        <div className="enemy-details">
            <div className="enemy-details-picture">
                <img src="https://hollowknight.wiki.fextralife.com/file/Hollow-Knight/crawlid_enemy_hollow_knight_wiki_guide.png" alt="" />
            </div>
            <div className="enemy-details-grid">
                <div className="enemy-details-description flex">
                    description
                </div>
                <div className="enemy-more-details flex">
                    details
                </div>
                <div className="edit-enemy-button flex">
                    <Button onClick={()=>{navigate(`/edit-enemy/${0}`)}}>Edit</Button>
                </div>
                <div className="delete-enemy-button flex">
                    <Button>Delete</Button>
                </div>
                <div className="back-button flex">
                    <Button onClick={()=>{navigate('/journal')}}>Back</Button>
                </div>
            </div>
        </div>
    )
}

export default EnemyDetails;