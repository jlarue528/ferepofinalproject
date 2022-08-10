import React from 'react';

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const {
    cancel,
    errors,
    submit,
    submitButtonText,
    elements,
  } = props;

  
    /*
        * This function will provide handle submit functionality 
        * for all forms that use this component. It will prevent
        * the default behavior and submit the form.
    */
  function handleSubmit(event) {
    event.preventDefault();
    submit();
  }

   /*
        * This function will provide handle cancel functionality 
        * for all forms that use this component. It will prevent
        * the default behavior and cancel.
    */
  function handleCancel(event) {
    event.preventDefault();
    cancel();
  }

  return (
    <div>
      <ErrorsDisplay errors={errors} />
      <form onSubmit={handleSubmit}>
        {elements()}
        <div className="pad-bottom">
          <button className="button" type="submit">{submitButtonText}</button>
          <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

/*
    * This function will provide errors to the page that are rendered
    * from validation errors on forms that use this component
*/

function ErrorsDisplay({ errors }) {
  let errorsDisplay = null;

  if (errors.length) {
    errorsDisplay = (
        <div className="validation--errors">
        <h3>Validation errors</h3>
          <ul>
            {errors.map((error, i) => <li key={i}>{error}</li>)}
          </ul>
      </div>
    );
  }

  return errorsDisplay;
}


