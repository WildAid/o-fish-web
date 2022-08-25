import React from "react";
import { useTranslation } from "react-i18next";
import { NoteItem } from "./NoteItem";


const NotesSection = ({ notes, onChange }) => {
  const { t } = useTranslation();

  const handleAdd = () => onChange([...notes, { id: notes.length + 1, note: '', photoIDs: [] }]);
  const handleDelete = (id) => onChange(notes.filter((x) => x.id !== id));

  return (
    <section className="flex-column box-shadow white-bg margin-top">
      <div className="table-name padding-25 border-bottom">
        {t("BOARDING_PAGE.VIEW_BOARDING.NOTES")}
      </div>
      {
        notes.length > 0 ? notes.map((note, index) => (
          <NoteItem
            note={note}
            isLast={index === notes.length - 1}
            handleAdd={handleAdd}
            handleDelete={() => handleDelete(note.id)}
            onChange={(data) => onChange(notes.map((x) => x.id === data.id ? data : x))}
          />
        ))
          : (
            (
              <div className="flex-column align-center margin-bottom">
                <span className="padding-25 font-17 grey-color">
                  {t("BOARDING_PAGE.NEW_BOARDING.NO_NOTES")}
                </span>
                <button
                  onClick={handleAdd}
                  className="white-btn add-btn">
                  {`+ ${t("BUTTONS.ADD_NOTES")}`}
                </button>
              </div>
            )
          )
      }
    </section>
  )
}

export default NotesSection;
