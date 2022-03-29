import React from 'react';
import Icon from "@material-ui/core/Icon";
import RiskIcon from "../../../partials/risk-icon/risk-icon.component";
import FilterLine from "../filter-line.component";
import { useTranslation } from "react-i18next";

import './filter-risk.css';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const Risks = [
    {
        name: "safetyLevel.red",
        field: "inspection.summary.safetyLevel.level",
        value: "Red",
        title: "Red",
        partTitle: "Risk: Red",
        type: "risk",
    },
    {
        name: "safetyLevel.amber",
        field: "inspection.summary.safetyLevel.level",
        value: "Amber",
        title: "Amber",
        partTitle: "Risk: Amber",
        type: "risk",
    },
    {
        name: "safetyLevel.green",
        field: "inspection.summary.safetyLevel.level",
        value: "Green",
        title: "Green",
        partTitle: "Risk: Green",
        type: "risk",
    },
]

const FilterRiskItem = ({ handleApply, handleRemove, selectedRisk }) => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = React.useState(false);
    const [currentValue, changeCurrentValue] = React.useState(selectedRisk.value);
    const dropdownRef = React.useRef(null);

    React.useEffect(() => {
        changeCurrentValue(selectedRisk.value);
    }, [selectedRisk]);

    const handleClose = () => {
        if (currentValue !== selectedRisk) {
            changeCurrentValue(selectedRisk.value);
        }

        setIsOpen(false);
    }


    return (
        <>
            <div className="filter-part-tag">
                <div className="filter-part-name">{t("TABLE.RISK")}:</div>
                <RiskIcon safetyLevel={currentValue} />
                <Icon
                    className="remove-filter-btn pointer"
                    onClick={() => {
                        handleRemove(currentValue);
                        setIsOpen(false);
                    }}
                >
                    cancel
                </Icon>
                <Icon onClick={() => setIsOpen((prevState) => !prevState)}>expand_more</Icon>
            </div>
            {isOpen && (
                <div ref={dropdownRef} className="filter-search-panel absolute white-bg box-shadow">
                    <section className='filter-risk-check-container'>
                        {Risks.map((filterPart, index) => (
                            <FilterLine
                                key={index}
                                parts={[]}
                                partConfig={filterPart}
                                onCheck={() => {
                                    changeCurrentValue(filterPart.value);
                                }}
                                check={filterPart.value === currentValue}
                            />
                        ))}
                    </section>
                    <div className="flex-row">
                        <button className="blue-btn" onClick={() => {
                            handleApply(currentValue);
                            setIsOpen(false);
                        }}>
                            {t("BUTTONS.APPLY")}
                        </button>
                        <button className="white-btn" onClick={handleClose}>
                            {t("BUTTONS.CLOSE")}
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}


export const FilterRisk = () => {
    const [selectedRisks, setSelectedRisks] = React.useState([]);
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const filters = React.useMemo(() => params.filter ? JSON.parse(params.filter) : {}, [params.filter]);

    React.useEffect(() => {
        const key = Object.keys(filters).find((key) => !!Risks.find((risk) => risk.field === key));
        if (key) {
            setSelectedRisks(Risks.filter((risk) => filters[key].includes(risk.value)));
        }
    }, [filters]);


    const handleRemove = (item) => {
        if (filters.hasOwnProperty(Risks[0].field) && !!filters[Risks[0].field]) {
            if (filters[Risks[0].field]?.length > 0) {
                filters[Risks[0].field] = filters[Risks[0].field].filter((risk) => risk !== item);
            } else {
                delete filters[Risks[0].field];
            }
            const pathParts = location.pathname.split("/");
            pathParts[pathParts.length - 1] = JSON.stringify(filters);
            navigate(pathParts.join('/'));
        }
    }

    const handleApply = (item) => {
        const pathParts = location.pathname.split("/");
        pathParts[pathParts.length - 1] = JSON.stringify({
            ...filters, [item.field]: Array.from(
                new Set(
                    [].concat(
                        filters[Risks[0].field] || [],
                        item)))
        });
        navigate(pathParts.join('/'));
    }


    return <div className="flex-row">
        {selectedRisks.map((item, index) =>
            <FilterRiskItem
                handleApply={handleApply}
                handleRemove={handleRemove}
                selectedRisk={item}
                key={index}
            />)}
    </div>
}