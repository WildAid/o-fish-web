import React from 'react';
import BoardingService from "./../../services/boarding.service";
import withRouter from "../../helpers/withRouter";
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { EDIT_BOARDING_PAGE } from "../../root/root.constants.js";

const boardingService = BoardingService.getInstance();


const DraftBoardingList = ({ router }) => {
    const [drafts, setDrafts] = React.useState([]);
    React.useEffect(() => {
        boardingService.getDraftBoardings().then(setDrafts);
    }, []);
    const { t } = useTranslation();

    const goEdit = (id) => {
        router.navigate(EDIT_BOARDING_PAGE.replace(":id", id));
    }
    return (
        <div className="flex-column align-center white-bg box-shadow standard-view margin-top margin-bottom padding-bottom">
            <div className="flex-row justify-between align-end full-view padding-top padding-bottom border-bottom">
                <div className="main-info">
                    <div className="item-name">
                        {t("HOME_PAGE.MY_DRAFT_BOARDINGS")}
                    </div>
                </div>
            </div>
            <div className="table-wrapper">
                <table className="custom-table boardings-table">
                    <thead>
                        <tr className="table-row row-head border-bottom">
                            <td>{t("TABLE.DATE")}</td>
                            <td>{t("TABLE.TIME")}</td>
                            <td>{t("TABLE.VESSEL")}</td>
                            <td width={200}></td>
                        </tr>
                    </thead>
                    <tbody>
                        {drafts.map((draft, ind) => (
                            <tr
                                className="table-row row-body"
                                key={ind}
                            >
                                <td> {moment(draft.date).format("l LT")}</td>
                                <td> {moment(draft.date).format("LT")}</td>
                                <td> {draft.vessel ? draft.vessel.name : ""}</td>
                                <td>
                                    <div className="flex-row align-items-center">
                                        <div
                                            className="pointer see-all"
                                            onClick={() => goEdit(draft._id)}
                                            style={{
                                                marginRight: 10
                                            }}
                                        >
                                            {t("BUTTONS.EDIT")}
                                        </div>
                                        <div
                                            className="pointer see-all"
                                            onClick={() => boardingService.deleteBoarding(draft._id)}
                                        >
                                            {t("BUTTONS.DELETE")}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default withRouter(DraftBoardingList);