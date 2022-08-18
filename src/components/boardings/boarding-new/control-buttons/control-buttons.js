import React from "react";
import { withTranslation } from "react-i18next";


const ControlButtons = ({t, onCancel, onSave}) => {
	const [isMenuShown, showMenu] = useState(false);
	
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
				onClick={() => showMenu(prevState => !prevState)}
			>			
				{t("BUTTONS.SAVE_BOARDING")}
				<img
					className="custom-down-arrow"
					src={require("../../../../assets/angle-arrow-down.svg").default}
					alt="no arrow img"
				/>
				{isMenuShown && (
					<div className="flex-column absolute box-shadow white-bg nav-menu">
						<div onClick={onSave} className="nav-link">
							{t("BUTTONS.SAVE_AND_SUBMIT")}
						</div>
						<div onClick={() => onSave(true)} className="nav-link">					
							{t("BUTTONS.SAVE_AS_DRAFT")}
						</div>
					</div>
				)}
			</button>
		</div>
	);
};

export default withTranslation("translation")(ControlButtons);