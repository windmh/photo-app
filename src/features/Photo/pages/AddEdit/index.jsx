import React from "react";
import { useDispatch } from "react-redux";

import "./AddEdit.scss";
import Banner from "components/Banner";
import PhotoForm from "features/Photo/components/PhotoForm";
import { addPhoto, updatePhoto } from "features/Photo/photoSlice";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { randomNumber } from "utils/common";

function AddEditPage(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { photoId } = useParams();
  const isAddMode = !photoId;

  const editedPhoto = useSelector((state) =>
    state.photos.find((x) => x.id === +photoId)
  );

  console.log({ photoId: photoId, editedPhoto });

  const initialValues = isAddMode
    ? {
        title: "",
        categoryId: null,
        photo: "",
      }
    : editedPhoto;

  const handleSubmit = (values) => {
    return new Promise((resolve) => {
      // console.log("Form submit: ", values);
      setTimeout(() => {
        if (isAddMode) {
          const newPhoto = {
            ...values,
            id: randomNumber(10000, 99999),
          };
          const action = addPhoto(newPhoto);
          dispatch(action);
        } else {
          const action = updatePhoto(values);
          dispatch(action);
        }

        history.push("/photos");
        resolve(true);
      }, 2000);
    });
  };

  return (
    <div className="photo-edit">
      <Banner title="Pick your amazing photo 😎" />
      <div className="photo-edit__form">
        <PhotoForm
          isAddMode={isAddMode}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

AddEditPage.propTypes = {};

export default AddEditPage;
