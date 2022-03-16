import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Container } from "reactstrap";

import Banner from "components/Banner";
import Images from "constants/images";
import { useSelector } from "react-redux";
import PhotoList from "features/Photo/components/PhotoList";
import { removePhoto } from "features/Photo/photoSlice";
import { useDispatch } from "react-redux";

MainPage.propTypes = {};

function MainPage(props) {
  const dispatch = useDispatch();
  const photos = useSelector((state) => state.photos);
  const history = useHistory();
  // console.log("List photo: ", photos);

  const handlePhotoEditClick = (photo) => {
    console.log("Edit: ", photo);
    const editPhotoUrl = `/photos/${photo.id}`;
    history.push(editPhotoUrl);
  };

  const handlePhotoRemoveClick = (photo) => {
    console.log("Remove: ", photo);
    const removePhotooId = photo.id;
    const action = removePhoto(removePhotooId);
    dispatch(action);
  };

  return (
    <div className="photo-main">
      <Banner title="You awesome photos 🎉" backgroundUrl={Images.PINK_BG} />
      <Container className="text-center">
        <div className="py-5">
          <Link to="/photos/add">Add new photo</Link>
        </div>

        <PhotoList
          photoList={photos}
          onPhotoEditClick={handlePhotoEditClick}
          onPhotoRemoveClick={handlePhotoRemoveClick}
        />
      </Container>
    </div>
  );
}

export default MainPage;
