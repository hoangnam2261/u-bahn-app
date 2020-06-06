import React from "react";
import PT from "prop-types";

import Button from "../Button";
import Input from "../Input";
import Modal from "../Modal";
import Pill from "../Pill";
import ProfileCard from "../ProfileCard";

import style from "./style.module.scss";

// TODO - Role is not an attribute but a nested property on user
// TODO - Remove it from Common Attribute and use it like other nested attributes (like skill / achievements)
const COMMON_ATTRIBUTES = ["role", "company", "location", "isAvailable"];

export default function EditProfileModal({ api, onCancel, updateUser, user }) {
  const [localUser, setLocalUser] = React.useState(user);
  const [skillInputValue, setSkillInputValue] = React.useState("");

  const updateUserFromChild = (userDataFromChild) => {
    setLocalUser(userDataFromChild);
  };

  return (
    <Modal className={style.container} onCancel={onCancel}>
      <ProfileCard
        api={api}
        stripped
        profile={localUser}
        avatarColor={localUser.avatarColor}
        saveChanges={false}
        formatData={false}
        updateUser={updateUserFromChild}
      />
      <div className={style.editor}>
        <div className={style.header}>
          <h1>Edit Profile</h1>
          <Button onClick={onCancel}>Cancel</Button>
          <Button
            className={style.saveButton}
            onClick={() => {
              // TODO - pass the update to the parent
              updateUser(localUser);
              onCancel();
            }}
          >
            Save
          </Button>
        </div>
        <h3>General</h3>
        <div className={style.inputs}>
          <Input
            label="First name"
            onChange={({ target }) => {
              setLocalUser({
                ...localUser,
                firstName: target.value,
              });
              setImmediate(() => target.focus());
            }}
            value={localUser.firstName}
          />
          <Input
            label="Last name"
            onChange={({ target }) => {
              setLocalUser({
                ...localUser,
                lastName: target.value,
              });
              setImmediate(() => target.focus());
            }}
            value={localUser.lastName}
          />
          <Input
            label="Current role"
            onChange={({ target }) => {
              setLocalUser({
                ...localUser,
                title: {
                  id: localUser.title.id,
                  value: target.value,
                },
              });
              setImmediate(() => target.focus());
            }}
            value={localUser.title.value}
          />
          <Input
            label="Company"
            onChange={({ target }) => {
              setLocalUser({
                ...localUser,
                company: {
                  id: localUser.company.id,
                  value: target.value,
                },
              });
              setImmediate(() => target.focus());
            }}
            value={localUser.company.value}
          />
          <Input
            label="Location"
            onChange={({ target }) => {
              setLocalUser({
                ...localUser,
                location: {
                  id: localUser.location.id,
                  value: target.value,
                },
              });
              setImmediate(() => target.focus());
            }}
            value={localUser.location.value}
          />
        </div>
        <h3>Skills</h3>
        <div className={style.pillGroup}>
          <input
            className={style.input}
            onKeyUp={({ key }) => {
              if (key === "Enter") {
                const skill = skillInputValue.trim();
                if (skill) {
                  setLocalUser({
                    ...localUser,
                    skills: [
                      ...localUser.skills,
                      {
                        name: skill,
                      },
                    ],
                  });
                }
                setSkillInputValue("");
              }
            }}
            onChange={({ target }) => {
              let { value } = target;
              if (value.endsWith(",")) {
                const skill = value.slice(0, -1).trim();
                if (skill) {
                  setLocalUser({
                    ...localUser,
                    skills: [
                      ...localUser.skills,
                      {
                        name: skill,
                      },
                    ],
                  });
                }
                value = "";
              }
              setSkillInputValue(value);
              setImmediate(() => target.focus());
            }}
            placeholder="Enter skill to add"
            value={skillInputValue}
          />
          {localUser.skills.map((it, key) => (
            <Pill
              key={key}
              name={it.skill.name}
              onRemove={() => {
                setLocalUser({
                  ...localUser,
                  skills: localUser.skills.filter((skill) => skill !== it),
                });
              }}
            />
          ))}
        </div>
        <h3>Achievements</h3>
        <div className={style.pillGroup}>
          {localUser.achievements.length > 0 &&
            localUser.achievements.map((value, key) => (
              <Pill key={key} name={value} removable={false} />
            ))}
          {localUser.achievements.length === 0 && (
            <span className={style.message}>
              {"This user has no achievements"}
            </span>
          )}
        </div>
        <h3>Custom attributes</h3>
        <div className={style.inputs}>
          {localUser.customAttributes
            .filter((attr) => !COMMON_ATTRIBUTES.includes(attr.attributeName))
            .map((attr, key) => (
              <Input
                key={key}
                label={attr.attributeName}
                onChange={({ target }) => {
                  setLocalUser({
                    ...localUser,
                    attributes: localUser.customAttributes.map((el) =>
                      el.attributeName === attr.attributeName
                        ? { ...el, value: target.value }
                        : el
                    ),
                  });
                  setImmediate(() => target.focus());
                }}
                value={localUser.customAttributes[key].value}
              />
            ))}
        </div>
        <Button className={style.dangerButton} onClick={onCancel}>
          Delete this user
        </Button>
      </div>
    </Modal>
  );
}

EditProfileModal.propTypes = {
  api: PT.shape().isRequired,
  onCancel: PT.func.isRequired,
  updateUser: PT.func.isRequired,
  user: PT.shape().isRequired,
};
