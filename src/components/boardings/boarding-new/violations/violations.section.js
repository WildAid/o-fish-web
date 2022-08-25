import React from "react";

import { useTranslation } from "react-i18next";

import { SeizuresSection } from "./seizures.section";
import CustomMenuService from '../../../../services/custom-menu.service';
import AuthService from '../../../../services/auth.service';
import { ViolationItem } from "./ViolationItem";
import './violation.section.style.css';

const authService = AuthService.getInstance();
const customMenuService = CustomMenuService.getInstance();


const ViolationsSection = (
  {
    onSeizuresChange,
    seizures,
    onViolationsChange, violations,
    crewMembers
  }) => {
  const { t } = useTranslation();
  const [codes, setCodes] = React.useState([]);
  const [descriptions, setDescriptions] = React.useState([]);

  React.useEffect(() => {
    customMenuService.getMenus(authService.user.agency.name).then((res) => {
      setCodes(res.violationCodes);
      setDescriptions(res.violationDescriptions);
    })
  }, []);

  const handleAdd = () => onViolationsChange([...violations, {
    id: violations.length + 1,
    disposition: 'warning',
    offence: { code: '', explanation: '' },
    crewMember: { name: '', license: '' }
  }]);
  const handleDelete = (id) => onViolationsChange(violations.filter((x) => x.id !== id));

  return (
    <div className="flex-column">
      <section className="box-shadow white-bg margin-top">
        <div className="table-name padding-25 border-bottom">
          {t("TABLE.VIOLATIONS")}
        </div>
        {
          violations.length > 0 ? violations.map((violation, index) => (
            <ViolationItem
              violation={violation}
              isLast={index === violations.length - 1}
              handleAdd={handleAdd}
              handleDelete={() => handleDelete(violation.id)}
              onChange={(data) => onViolationsChange(violations.map((x) => x.id === data.id ? data : x))}
              codes={codes}
              descriptions={descriptions}
              crewMembers={crewMembers}
            />
          )) : (
            <div className="flex-column align-center margin-bottom">
              <span className="padding-25 font-17 grey-color">
                {t("BOARDING_PAGE.NEW_BOARDING.NO_VIOLATIONS")}
              </span>
              <button
                onClick={handleAdd}
                className="white-btn add-btn">
                {`+ ${t("BUTTONS.ADD_VIOLATION")}`}
              </button>
            </div>
          )
        }
      </section>
      <SeizuresSection onChange={onSeizuresChange} seizures={seizures} />
    </div>

  );
}

export default ViolationsSection;