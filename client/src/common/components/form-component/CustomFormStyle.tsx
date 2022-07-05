import styled from 'styled-components';

const StyledForm = styled.form`
  width: 90%;
  max-width: 26rem;
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
      padding-left: 0.5rem;
      color: red;
      font-size: 1.1rem;
    }
  }

  & input {
    font-size: 1.2rem;
    width: 100%;
    border-bottom: 3px solid gray;
    padding: 0.4rem 0.8rem;

    &:focus {
      border-bottom: 3px solid ${(props) => props.theme.point3};
    }
  }

  & > div {
    margin-bottom: 3.2rem;
  }

  & p {
    color: red;
    font-size: 1.2rem;
    border: 1rem 0;
  }
`;

export default StyledForm;
