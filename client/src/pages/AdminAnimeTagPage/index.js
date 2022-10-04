import "./index.scss";
import AdminTableAnimeTag from "../../component/AdminTableAnimeTag";
import AdminAnimeTagModal from "../../component/AdminAnimeTagModal";
import { useState, useEffect } from 'react';

const AdminAnimeTagPage = () => {
    const [modalTag, setModalTag] = useState()
    const [modalModeTag, setModalModeTag] = useState('')
    const [openTag, setOpenTag] = useState(false);
    const handleCloseModalTag = () =>setOpenTag(false);
    const handleOpenModalTag = (item, mode) => {
        setModalModeTag(mode);
        if (mode == "edit") {
            setModalTag(item)
        }
        setOpenTag(true);
    }
  return (
    <div>
        <div className="adminAnime-header">
            <h1>Manage Tag Anime</h1>
        </div>
        <div className="adminAnimeTag-container">
            <div className="adminAnimeTag-container-table">
                <div className="adminAnimeTag-container-header">
                   <h2>Tag Anime</h2>
                    <button onClick={() => handleOpenModalTag([], "create")}>Add Tag</button> 
                </div>
                <AdminTableAnimeTag />
            </div>
            <div className="adminAnimeTag-container-table">
                <div className="adminAnimeTag-container-header">
                   <h2>Tag Anime</h2>
                    <button>Add Tag</button> 
                </div>
                
            </div>
        </div>
        <AdminAnimeTagModal open={openTag} onClose={handleCloseModalTag} tag={modalTag} mode={modalModeTag}/>
    </div>
  );
};
export default AdminAnimeTagPage;
