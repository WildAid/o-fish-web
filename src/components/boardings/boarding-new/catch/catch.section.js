import React from "react";

import CustomMenuService from '../../../../services/custom-menu.service';
import AuthService from '../../../../services/auth.service';
import { useTranslation } from "react-i18next";
import { CatchItem } from "./CatchItem";
import './catch.section.style.css';

const authService = AuthService.getInstance();
const customMenuService = CustomMenuService.getInstance();


const CatchSection = ({ catches, onChange }) => {
  const { t } = useTranslation();
  const [species, setSpecies] = React.useState([]);

  React.useEffect(() => {
    customMenuService.getMenus(authService.user.agency.name).then((res) => {
      setSpecies(res.species);
    })
  }, []);


  const handleAdd = () => onChange([...catches, { id: catches.length + 1, fish: '', number: 0, unit: '', weight: 0 }]);
  const handleDelete = (id) => onChange(catches.filter((x) => x.id !== id));

  return (
    <div className="flex-column">
      <section className="box-shadow white-bg margin-top">
        <div className="table-name padding-25 border-bottom">
          {t("FILTER.MAIN.CATCH.NAME")}
        </div>
        {
          catches.length > 0 ? catches.map((catchItem, index) => (
            <CatchItem
              catchItem={catchItem}
              isLast={index === catches.length - 1}
              handleAdd={handleAdd}
              handleDelete={() => handleDelete(catchItem.id)}
              onChange={(data) => onChange(catches.map((x) => x.id === data.id ? data : x))}
              species={species}
            />
          )) : (
            <div className="flex-column align-center margin-bottom">
              <span className="padding-25 font-17 grey-color">
                {t("BOARDING_PAGE.NEW_BOARDING.NO_CATCH")}
              </span>
              <button
                onClick={handleAdd}
                className="white-btn add-btn">
                {`+ ${t("BUTTONS.ADD_CATCH")}`}
              </button>
            </div>
          )
        }
      </section>
    </div>
  )
}

export default CatchSection;
