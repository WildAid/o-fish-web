import React from 'react';
import { FormControl, MenuItem, Select, InputLabel } from "@material-ui/core";
import { useTranslation } from 'react-i18next';
import { RadioButton } from '../../../partials/RadioButton';



export const ViolationItem = ({
    violation,
    crewMembers,
    codes,
    descriptions,
    handleDelete,
    handleAdd,
    onChange,
    isLast,
}) => {
    const { t } = useTranslation();

    return (
        <div className="padding-25">
            <div className="flex-row justify-between">
                <h3 className="item-name">{`${t("TABLE.VIOLATION")} ${violation.id}`}</h3>
            </div>
            <div className="flex-row justify-between relative padding-bottom margin-bottom">
                <FormControl className="third-row-view">
                    <InputLabel id={`violations-code-${violation.id}`}>
                        {t("TABLE.VIOLATION")}
                    </InputLabel>
                    <Select
                        onChange={(e) => {
                            const values = e.target.value.split("@@@");
                            onChange({
                                ...violation,
                                offence: {
                                    code: values[0],
                                    explanation: values[1],
                                }
                            })
                        }}
                        value={`${violation.offence.code}@@@${violation.offence.explanation}`}
                        labelId={`violations-code-${violation.id}`}
                    >
                        {
                            codes.length > 0 && codes.map((code, index) => (
                                <MenuItem value={`${code}@@@${descriptions[index]}`} key={code}>
                                    {code} <br /> {descriptions[index]}
                                </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                <FormControl className="third-row-view">
                    <InputLabel id={`violations-issued_to-${violation.id}`}>
                        {t("TABLE.ISSUED_TO")}
                    </InputLabel>
                    <Select
                        onChange={(e) => {
                            const values = e.target.value.split("@@@");
                            onChange({
                                ...violation,
                                crewMember: {
                                    name: values[0],
                                    license: values[1],
                                }
                            })
                        }}
                        value={violation.crewMember ? `${violation.crewMember.name}@@@${violation.crewMember.license}` : null}
                        labelId={`violations-issued_to-${violation.id}`}
                    >
                        {
                            crewMembers.length > 0 ?
                                crewMembers.map((crewMember) => {
                                    if (crewMember?.name && crewMember?.license) {
                                        const value = `${crewMember.name}@@@${crewMember.license}`;
                                        return <MenuItem value={value} key={crewMember.license}>
                                            {crewMember.name} {crewMember.captain && <div className='issued_to__selectobox__captain-item'>captain</div>}
                                        </MenuItem>
                                    } else {
                                        return null;
                                    }
                                })
                                : <MenuItem value={null}>Not have crew members</MenuItem>
                        }
                    </Select>
                </FormControl>
                <div className='third-row-view'>
                    <RadioButton
                        options={[
                            {
                                label: 'Warning',
                                value: 'warning'
                            },
                            {
                                label: 'Citation',
                                value: 'citation'
                            }]}
                        defaultValue={violation.disposition}
                        onChange={(value) => onChange({ ...violation, disposition: value })}
                    />
                </div>
            </div>
            <p onClick={handleDelete} style={{ textAlign: "right" }} className="blue-color font-16 pointer margin-top">
                {`- ${t("BUTTONS.REMOVE_VIOLATION")}`}
            </p>
            {
                isLast && (
                    <span onClick={handleAdd} className="blue-color font-16 pointer margin-top">
                        {`+ ${t("BUTTONS.ADD_VIOLATION")}`}
                    </span>
                )
            }
        </div >
    )
}