import classnames from 'classnames';

import {
  errorMessage,
  errorBorder,
  phoneAndEmail,
  labelAndInput,
  companySection,
} from '../utils/classNames';

const CompanySection = ({
  companyName,
  setCompanyName,
  invalidName,
  setInvalidName,
  companyPhone,
  setCompanyPhone,
  invalidPhone,
  setInvalidPhone,
  companyEmail,
  setCompanyEmail,
  invalidEmail,
  setInvalidEmail,
  isEmpty,
  isEmailValid,
}) => (
  <section className={companySection}>
    <h2>Company</h2>
    <div className={labelAndInput}>
      <label>NAME*</label>
      <input
        type="text"
        value={companyName}
        onBlur={() => {
          isEmpty(companyName) && setInvalidName(true);
        }}
        onChange={(event) => {
          setCompanyName(event.target.value);
          invalidName &&
            !isEmpty(event.target.value) &&
            setInvalidName(false);
        }}
        className={classnames({
          [`${errorBorder}`]: invalidName,
        })}
      />
      {invalidName && (
        <p className={errorMessage}>Name is required</p>
      )}
    </div>
    <div className={phoneAndEmail}>
      <div className={labelAndInput}>
        <label>PHONE*</label>
        <input
          type="text"
          value={companyPhone}
          onBlur={() => {
            isEmpty(companyPhone) && setInvalidPhone(true);
          }}
          onChange={(event) => {
            setCompanyPhone(event.target.value);
            invalidPhone &&
              !isEmpty(event.target.value) &&
              setInvalidPhone(false);
          }}
          className={classnames({
            [`${errorBorder}`]: invalidPhone,
          })}
        />
        {invalidPhone && (
          <p className={errorMessage}>Phone is required</p>
        )}
      </div>
      <div className={labelAndInput}>
        <label>E-MAIL*</label>
        <input
          type="text"
          value={companyEmail}
          onBlur={() => {
            !isEmailValid(companyEmail) &&
              setInvalidEmail(true);
          }}
          onChange={(event) => {
            setCompanyEmail(event.target.value);
            invalidEmail &&
              isEmailValid(event.target.value) &&
              setInvalidEmail(false);
          }}
          className={classnames({
            [`${errorBorder}`]: invalidEmail,
          })}
        />
        {invalidEmail && (
          <p className={errorMessage}>Email is not valid</p>
        )}
      </div>
    </div>
  </section>
);

export default CompanySection;
