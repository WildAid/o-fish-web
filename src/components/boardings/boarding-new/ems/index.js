import React from 'react';
import { useTranslation } from 'react-i18next';
import CustomMenuService from '../../../../services/custom-menu.service';
import AuthService from '../../../../services/auth.service';
import { FormControl, MenuItem, Select, TextField, InputLabel } from "@material-ui/core";

const customMenuService = CustomMenuService.getInstance();
const authService = AuthService.getInstance();


export const EMSSection = ({ onChange, selectedEMS }) => {
    const { t } = useTranslation();
    const [emsList, setEMSList] = React.useState([]);

    const [currentEMS] = selectedEMS;


    React.useEffect(() => {
        customMenuService.getMenus(authService.user.agency.name).then((res) => {
            setEMSList(res.emsTypes);
        })
    }, []);


    return (
        <section className="box-shadow padding-25 white-bg">
            <div className="flex-row justify-between">
                <h3 className="item-name">
                    {t("BOARDING_PAGE.EDIT_BOARDING.ELECTRONIC_INFO")}
                </h3>
            </div>
            {
                selectedEMS?.length > 0 ? <div>
                    <div className="flex-row justify-between relative">
                        <FormControl className="third-row-view">
                            <InputLabel id="emsType">{t("BOARDING_PAGE.EDIT_BOARDING.TYPE")}</InputLabel>
                            <Select
                                onChange={(e) => onChange("ems", false, [{ ...currentEMS, emsType: e.target.value }])}
                                value={selectedEMS.emsType}
                                labelId={"emsType"}
                            >
                                {
                                    emsList.map((ems) => (
                                        <MenuItem value={ems} key={ems}>
                                            {ems}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        <TextField
                            required
                            label={t("TABLE.DESCRIPTION")}
                            className="third-row-view"
                            name="emsDescription"
                            value={selectedEMS.emsDescription}
                            onChange={(e) =>
                                onChange("ems", false, [{ ...currentEMS, emsDescription: e.target.value }])
                            }
                        />
                        <TextField
                            required
                            label={t("BOARDING_PAGE.EDIT_BOARDING.REGISTRY_NUMBER")}
                            className="third-row-view"
                            name="registryNumber"
                            value={selectedEMS.registryNumber}
                            onChange={(e) =>
                                onChange("ems", false, [{ ...currentEMS, registryNumber: e.target.value }])
                            }
                        />
                        <div className="checkbox-wrapper flex-row align-center">
                            <input className="checkbox" type="checkbox" />
                            <span>{t("BOARDING_PAGE.NEW_BOARDING.NONE")}</span>
                        </div>
                    </div>
                </div> : (
                    <div className="flex-column align-center margin-bottom">
                        <span className="padding-25 font-17 grey-color">
                            {t("BOARDING_PAGE.NEW_BOARDING.NO_ELECTRONIC_SYSTEM")}
                        </span>
                        <button
                            onClick={() => onChange('ems', false, [{ emsType: '', emsDescription: "", registryNumber: "" }])}
                            className="white-btn add-btn">
                            {`+ ${t("BUTTONS.ADD_MONITORING_SYSTEM")}`}
                        </button>
                    </div>
                )
            }
        </section>
    )
}