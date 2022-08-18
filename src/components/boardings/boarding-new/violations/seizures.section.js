import React from 'react';
import { useTranslation } from 'react-i18next';
import { TextField } from '@material-ui/core';
import { AttachFile } from "../../../partials/attachment";
import { ImagePreview } from "../../../partials/image-preview";
import StitchService from "../../../../services/stitch.service";
import AuthService from "../../../../services/auth.service";
import { bufferToBase64 } from '../../../../helpers/get-data';

const stitchService = StitchService.getInstance();
const authService = AuthService.getInstance();


export const SeizuresSection = ({ seizures, onChange }) => {
    const { t } = useTranslation();
    const [image, setImage] = React.useState(null);

    const handleUploadPhoto = (blob) => {
        stitchService.uploadImage(blob, authService.user.agency.name).then((data) => {
            onChange({ ...seizures, attachments: [data.insertedId] });
            stitchService.getPhoto(data.insertedId).then((photoObject) => {
                setImage(
                    "data:image/jpeg;base64," + bufferToBase64(photoObject.picture.buffer),
                );
            });
        });
    }

    const handleRemovePhoto = () => {
        const image = seizures.attachments?.[0];
        if (image) {
            stitchService.deleteImage(image).then(() => {
                const { attachments, ...updatedSeizures } = seizures;
                onChange(updatedSeizures);
                setImage(null);
            });
        }
    }

    return (
        <section className="box-shadow padding-25 white-bg">
            <div className="flex-row justify-between">
                <h3 className="item-name">{t("BOARDING_PAGE.EDIT_BOARDING.SEIZURES")}</h3>
                <AttachFile onChange={handleUploadPhoto} />
            </div>
            <div className="flex-row justify-between relative margin-bottom">
                <TextField
                    label={t("AGENCY_PAGE.EDIT_AGENCY.DESCRIPTION")}
                    className="full-view"
                    name="name"
                    onChange={e => onChange({ ...seizures, text: e.target.value })}
                />
                <div className="checkbox-wrapper flex-row align-center">
                    <input
                        className="checkbox"
                        type="checkbox"
                    />
                    <span>
                        {t("BOARDING_PAGE.NEW_BOARDING.NONE")}
                    </span>
                </div>
            </div>
            {
                image && (
                    <ImagePreview src={image} onRemove={handleRemovePhoto} />
                )
            }
        </section>
    )
}