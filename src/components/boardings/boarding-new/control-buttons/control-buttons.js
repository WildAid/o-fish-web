import React from "react";
import { withTranslation } from "react-i18next";

const ControlButtons = ({ t, onCancel, onSave }) => {

	return (
		<div>
			<button
				className="white-btn"
				onClick={onCancel}
			>
				{t("BUTTONS.CANCEL")}
			</button>
			<button
				className="blue-btn relative"
				onClick={onSave}
			>
				{t("BUTTONS.SAVE_BOARDING")}
			</button>
		</div>
	);
};

export default withTranslation("translation")(ControlButtons);
