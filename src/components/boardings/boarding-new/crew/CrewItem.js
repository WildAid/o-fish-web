import React from 'react';
import { TextField } from "@material-ui/core";
import { useTranslation } from 'react-i18next';


export const CrewItem = ({ crew, onChange, handleDelete, handleAdd, isLast }) => {
    const { t } = useTranslation();
    return (
        <div className="padding-25">
            <div className="flex-row justify-between">
                <h3 className="item-name">{t("NAVIGATION.CREW")}</h3>
            </div>
            <div className="flex-row justify-between relative padding-bottom margin-bottom">
                <TextField
                    required
                    label={t("TABLE.NAME")}
                    className="half-row-view"
                    name="name"
                    value={crew.name}
                    onChange={e => onChange({ ...crew, name: e.target.value })}
                />
                <TextField
                    required
                    label={t("TABLE.LICENSE_NUMBER")}
                    className="half-row-view"
                    name="license"
                    value={crew.license}
                    onChange={e => onChange({ ...crew, license: e.target.value })}
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
            <p onClick={handleDelete} style={{ textAlign: "right" }} className="blue-color font-16 pointer margin-top">
                {`- ${t("BUTTONS.REMOVE_CREW")}`}
            </p>
            {
                isLast && (
                    <span onClick={handleAdd} className="blue-color font-16 pointer margin-top">
                        {`+ ${t("BUTTONS.ADD_CREW")}`}
                    </span>
                )
            }
        </div>
    )
}