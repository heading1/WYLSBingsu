import styled from 'styled-components';

const StyledForm = styled.form`
  width: 23rem;
  margin-bottom: 1.5rem;

  & h1 {
    font-size: 1.5rem;
    text-align: center;
    margin-bottom: 4rem;

    & > strong {
      color: ${(props) => props.theme.point3};
    }
  }

  & label,
  & input {
    display: block;
  }

  & label {
    margin-bottom: 0.9rem;
    font-size: 1.5rem;

    & > span {
      color: red;
      font-size: 1rem;
    }
  }

  & input {
    font-size: 1.2rem;
    width: 100%;
    border-bottom: 3px solid black;
    padding: 0.4rem 0.8rem;

    :-webkit-autofill,
    :-webkit-autofill:hover,
    :-webkit-autofill:focus,
    :-webkit-autofill:active {
      transition: background-color 5000s ease-in-out 0s;
      -webkit-transition: background-color 9999s ease-out;
      -webkit-box-shadow: 0 0 0px 1000px white inset !important;
      box-shadow: 0 0 0px white inset !important;
    }

    &:focus {
      border-bottom: 3px solid ${(props) => props.theme.point3};
    }
  }

  & > div {
    margin-bottom: 3.8rem;
  }

  & p {
    color: red;
    font-size: 1.2rem;
    border: 1rem 0;
  }
`;

export default StyledForm;
