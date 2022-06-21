import styled from 'styled-components';

const StyledForm = styled.form`
  width: 23rem;

  & label,
  & input {
    display: block;
  }

  & label {
    margin-bottom: 0.9rem;
    font-size: 1.4rem;
  }

  & input {
    font-size: 1.2rem;
  }

  & > div {
    margin-bottom: 1.8rem;
  }

  & input:not([type='submit']) {
    width: 100%;
    border-bottom: 1px solid black;
  }

  & input[type='submit'] {
    width: 4.5rem;
    height: 2.4rem;
    border: ${(props) => `1px solid ${props.theme.point2}`};
    border-radius: 20px;
    background-color: ${(props) => props.theme.point2};
    color: white;
    opacity: 0.7;
    cursor: pointer;
    transition: opacity 0.2s linear;

    &:hover {
      opacity: 1;
    }
  }

  & p {
    color: red;
    font-size: 1.2rem;
  }
`;

export default StyledForm;
