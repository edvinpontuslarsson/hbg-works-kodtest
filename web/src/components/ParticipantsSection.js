import classnames from 'classnames';

import {
  participantsSection,
  participantHeading,
  addParticipantButton,
  errorMessage,
  errorBorder,
  phoneAndEmail,
  labelAndInput,
} from '../utils/classNames';

const ParticipantsSection = ({
  participants,
  getParticipant,
  handleAddParticipant,
  handleChangeParticipant,
  handleRemoveParticipant,
  isEmpty,
}) => (
  <section className={participantsSection}>
    <h2>Participants</h2>
    {participants.map((participant, index) => (
      <div key={participant.id}>
        <div className={participantHeading}>
          <h3>Participant #{index + 1}</h3>
          {index !== 0 && (
            <button
              onClick={() => {
                handleRemoveParticipant(participant.id);
              }}
            >
              <h3>X</h3>
            </button>
          )}
        </div>
        <div className={labelAndInput}>
          <label>NAME*</label>
          <input
            type="text"
            value={participant.name}
            name="name"
            onBlur={() => {
              const current = getParticipant(
                participant.id
              );
              !current.changed &&
                handleChangeParticipant(participant.id, {
                  // mimics event interface
                  target: {
                    name: 'changed',
                    value: true,
                  },
                });
            }}
            onChange={(event) => {
              handleChangeParticipant(
                participant.id,
                event
              );
            }}
            className={classnames({
              [`${errorBorder}`]:
                participants[index].changed &&
                isEmpty(participants[index].name),
            })}
          />
          {participants[index].changed &&
            isEmpty(participants[index].name) && (
              <p className={errorMessage}>
                Participant's name is required
              </p>
            )}
        </div>

        <div className={phoneAndEmail}>
          <div className={labelAndInput}>
            <label>PHONE</label>
            <input
              type="text"
              value={participant.phone}
              name="phone"
              onChange={(event) => {
                handleChangeParticipant(
                  participant.id,
                  event
                );
              }}
            />
          </div>
          <div className={labelAndInput}>
            <label>E-MAIL</label>
            <input
              type="text"
              value={participant.email}
              name="email"
              onChange={(event) => {
                handleChangeParticipant(
                  participant.id,
                  event
                );
              }}
            />
          </div>
        </div>
      </div>
    ))}
    <button
      className={addParticipantButton}
      disabled={participants.some(
        (item) => item.name === ''
      )}
      onClick={() => handleAddParticipant()}
    >
      Add a participant
    </button>
  </section>
);

export default ParticipantsSection;
