import React from 'react';
import { FormControl, MenuItem, Select, TextField, InputLabel } from "@material-ui/core";
import { useTranslation } from 'react-i18next';


export const CatchItem = ({ catchItem, species, onChange, handleAdd, handleDelete, isLast }) => {
    const { t } = useTranslation();

    return (
        <div className="padding-25">
            <div className="flex-row justify-between">
                <h3 className="item-name">{`${t("FILTER.MAIN.CATCH.NAME")} ${catchItem.id}`}</h3>
            </div>
            <div className="flex-row justify-between relative padding-bottom margin-bottom">
                <FormControl className="new-boarding__catch--species">
                    <InputLabel id={`catch-fish-${catchItem.id}`}>
                        {t("FILTER.MAIN.CATCH.SPECIES")}
                    </InputLabel>
                    <Select
                        onChange={(e) => onChange({ ...catchItem, fish: e.target.value })}
                        value={catchItem.fish}
                        labelId={`catch-fish-${catchItem.id}`}
                    >
                        {
                            species.map((spec) => (
                                <MenuItem value={spec} key={spec}>
                                    {spec}
                                </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                <TextField
                    required
                    label={t("TABLE.DESCRIPTION")}
                    className="new-boarding__catch--description"
                    name="description"
                    value={catchItem.description}
                    onChange={e => onChange({ ...catchItem, description: e.target.value })}
                />
                <TextField
                    type="number"
                    required
                    label={t("FILTER.MAIN.CATCH.WEIGHT")}
                    className="new-boarding__catch--weight"
                    name="weight"
                    value={catchItem.weight}
                    onChange={e => onChange({ ...catchItem, weight: parseFloat(e.target.value) })}
                />
                <FormControl className="new-boarding__catch--units">
                    <InputLabel id={`catch-units-${catchItem.id}`}>
                        {t("FILTER.MAIN.CATCH.UNITS")}
                    </InputLabel>
                    <Select
                        onChange={(e) => onChange({ ...catchItem, unit: e.target.value })}
                        value={catchItem.unit}
                        labelId={`catch-units-${catchItem.id}`}
                    >
                        {
                            ["kg", "tonnes", "lbs", "tons"].map((unit) => (
                                <MenuItem value={unit} key={unit}>
                                    {unit}
                                </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                <TextField
                    type="number"
                    required
                    label={t("FILTER.MAIN.CATCH.COUNT")}
                    className="new-boarding__catch--count"
                    name="number"
                    value={catchItem.number}
                    onChange={e => onChange({ ...catchItem, number: e.target.valueAsNumber })}
                />
            </div>
            <p onClick={handleDelete} style={{ textAlign: "right" }} className="blue-color font-16 pointer margin-top">
                {`- ${t("BUTTONS.REMOVE_CATCH")}`}
            </p>
            {
                isLast && (
                    <span onClick={handleAdd} className="blue-color font-16 pointer margin-top">
                        {`+ ${t("BUTTONS.ADD_CATCH")}`}
                    </span>
                )
            }
        </div>
    );
}