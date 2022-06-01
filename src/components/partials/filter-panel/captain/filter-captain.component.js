import './filter-captain.css';

import React from 'react';
import Icon from '@material-ui/core/Icon';
import Loading from '@material-ui/core/CircularProgress';
import FilterLine from "../filter-line.component";
import { useTranslation } from "react-i18next";
import CaptainService from '../../../../services/captain.service';
import { useLocation, useNavigate, useParams } from 'react-router-dom';



const captainService = CaptainService.getInstance();


export const FilterCaptain = () => {
    const { t } = useTranslation();
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = React.useState(false);
    const [captains, setCaptains] = React.useState([]);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [searchResult, setSearchResult] = React.useState([]);
    const [selectedList, setSelectedList] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    const filters = React.useMemo(() => params.filter && params.filter !== 'null' ? JSON.parse(params.filter) : {}, [params.filter]);

    React.useEffect(() => {
        setIsLoading(true);
        captainService.getCaptains().then(result => {
            setCaptains(result);
            return result;
        }).then((result) => {
            setSearchQuery('');
            setSearchResult(result);

        }).finally(() => setIsLoading(false));
    }, []);

    React.useEffect(() => {
        if (filters['captain.lastName']?.length > 0) {
            setSelectedList(captains.filter((item) => filters["captain.lastName"].includes(item)));
        }
        setSearchQuery('');
    }, [filters, captains]);

    React.useEffect(() => {
        if (!searchQuery) {
            setSearchResult(captains);
        }
    }, [searchQuery, captains]);


    const handleSearch = ({ target: { value } }) => {
        setSearchQuery(value);

        setSearchResult(captains.filter(x => x.includes(value)));
    }


    const handleRemove = () => {
        setSelectedList([]);
        const pathParts = location.pathname.split("/");
        delete filters['captain.lastName'];
        pathParts[pathParts.length - 1] = JSON.stringify({ ...filters });
        navigate(pathParts.join('/'));
        setIsOpen(false);
    }

    const handleChange = (captain) => {
        if (selectedList.includes(captain)) {
            setSelectedList(selectedList.filter(item => item !== captain));
        } else {
            setSelectedList([...selectedList, captain]);
        }
    }

    const handleApply = () => {
        const pathParts = location.pathname.split("/");
        pathParts[pathParts.length - 1] = JSON.stringify({
            ...filters, "captain.lastName": selectedList,
        });
        navigate(pathParts.join('/'));
        setIsOpen(false);
    }

    const handleClose = () => {
        setIsOpen(false);
    }

    const value = React.useMemo(() =>
        selectedList.length === 1 ?
            selectedList[0] : selectedList.length === 0 ? "Not selected"
                : selectedList.length, [selectedList]);

    return <>
        <div className="filter-part-tag">
            <div className="filter-part-name">{t("TABLE.CAPTAIN")}:</div>
            <span>{value}</span>
            <Icon
                className="padding-left remove-filter-btn pointer"
                onClick={handleRemove}
            >
                cancel
            </Icon>
            <Icon onClick={() => setIsOpen((prevState) => !prevState)}>expand_more</Icon>
        </div>

        {isOpen && (
            <div className="filter-search-panel absolute white-bg box-shadow">
                <div className="filter-captain-search-panel">
                    <Icon className="filter-captain-search-panel__icon" >search</Icon>
                    <input className="filter-captain-search-panel__input" placeholder={t('SEARCH.FILTER_SEARCH')} onChange={handleSearch} value={searchQuery} />
                </div>
                <section className='filter-captain-list'>
                    {!isLoading ? searchResult.map((name, index) => (
                        <FilterLine
                            key={index}
                            parts={[]}
                            partConfig={{
                                name: name,
                                title: name,
                            }}
                            onCheck={() => {
                                handleChange(name);
                            }}
                            check={selectedList.includes(name)}
                        />
                    )) : <Loading />}
                </section>
                <div className="flex-row filter-captain-footer">
                    <button className="blue-btn" onClick={handleApply}>
                        {t("BUTTONS.APPLY")}
                    </button>
                    <button className="white-btn" onClick={handleClose}>
                        {t("BUTTONS.CLOSE")}
                    </button>
                </div>
            </div>
        )}
    </>
}