import React from 'react';
import { TextField } from '@material-ui/core';
import { AttachFile } from "../../../partials/attachment";
import { ImagePreview } from "../../../partials/image-preview";
import StitchService from "../../../../services/stitch.service";
import AuthService from "../../../../services/auth.service";
import { bufferToBase64 } from "../../../../helpers/get-data";
import { useTranslation } from 'react-i18next';

const stitchService = StitchService.getInstance();
const authService = AuthService.getInstance();


export const NoteItem = ({ note, onChange, handleAdd, handleDelete, isLast }) => {
    const { t } = useTranslation();
    const [image, setImage] = React.useState(null);
    const handleUploadPhoto = (blob) => {
        stitchService.uploadImage(blob, authService.user.agency.name).then((data) => {
            onChange({ ...note, photoIDs: [data.insertedId] });
            stitchService.getPhoto(data.insertedId).then((photoObject) => {
                setImage("data:image/jpeg;base64," + bufferToBase64(photoObject.picture.buffer));
            })
        });
    }

    const handleRemovePhoto = () => {
        const image = this.state.attachments?.[0];
        if (image) {
            stitchService.deleteImage(image).then(() => this.setState({
                attachments: [],
                vesselImage: "",
            }, this.updateParentState));
        }
    }

    return (
        <div className="padding-25">
            <div className="flex-row justify-between">
                <h3 className="item-name">{`${t("BOARDING_PAGE.NEW_BOARDING.NO_NOTES")} ${note.id}`}</h3>
                <AttachFile onChange={handleUploadPhoto} />
            </div>
            <TextField
                required
                label={t("TABLE.NOTE")}
                className="full-view"
                name="note"
                value={note.note}
                onChange={(e) =>
                    onChange({ ...note, note: e.target.value })
                }
            />
            <p onClick={handleDelete} style={{ textAlign: "right" }} className="blue-color font-16 pointer margin-top">
                {`- ${t("BUTTONS.REMOVE_NOTES")}`}
            </p>
            {
                image && (
                    <ImagePreview src={image} onRemove={handleRemovePhoto} />
                )
            }
            {
                isLast && (
                    <span onClick={handleAdd} className="blue-color font-16 pointer margin-top">
                        {`+ ${t("BUTTONS.ADD_NOTES")}`}
                    </span>
                )
            }
        </div>
    )
}