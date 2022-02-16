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


export const FilterRisk = () => {
    const dropdownRef = React.useRef(null);
    const [selectedRisk, setSelectedRisk] = React.useState({});
    const [isOpen, setIsOpen] = React.useState(false);
    const { t } = useTranslation("translation");
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const filters = React.useMemo(() => params.filter ? JSON.parse(params.filter) : {}, [params.filter]);

    React.useEffect(() => {
        const key = Object.keys(filters).find((key) => !!Risks.find((risk) => risk.field === key));
        if (key) {
            setSelectedRisk(Risks.find((risk) => risk.value === filters[key]));
        }
    }, [filters]);


    const handleRemove = () => {
        if (filters.hasOwnProperty(selectedRisk.field)) {
            delete filters[selectedRisk.field];
            const pathParts = location.pathname.split("/");
            pathParts[pathParts.length - 1] = JSON.stringify(filters);
            navigate(pathParts.join('/'));
        }
    }

    const handleApply = () => {
        const pathParts = location.pathname.split("/");
        pathParts[pathParts.length - 1] = JSON.stringify({ ...filters, [selectedRisk.field]: selectedRisk.value });
        navigate(pathParts.join('/'));
        setIsOpen(false);
    }


    return (
        <>
            <div className="filter-part-tag">
                <div className="filter-part-name">{t("TABLE.RISK")}:</div>
                <RiskIcon safetyLevel={selectedRisk.value} />
                <Icon
                    className="remove-filter-btn pointer"
                    onClick={handleRemove}
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
                                    setSelectedRisk(filterPart);
                                }}
                                check={filterPart.value === selectedRisk.value}
                            />
                        ))}
                    </section>
                    <div className="flex-row">
                        <button className="blue-btn" onClick={handleApply}>
                            {t("BUTTONS.APPLY")}
                        </button>
                        <button className="white-btn" onClick={() => {
                            setIsOpen(false);
                        }}>
                            {t("BUTTONS.CLOSE")}
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}