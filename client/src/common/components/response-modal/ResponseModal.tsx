import { SuccessModal } from './ResponseModalStyle';
import { Link, To } from 'react-router-dom';

interface ResponseModalProps {
  to?: To;
  content: string;
  buttonText: string;
  onClick?: () => void;
}

const ResponseModal: React.FC<ResponseModalProps> = ({
  to,
  content,
  buttonText,
  onClick,
}) => {
  return (
    <SuccessModal>
      <div>
        <span>{content}</span>
        {to ? (
          <Link to={to}>
            <button>{buttonText}</button>
          </Link>
        ) : (
          <button onClick={onClick}>{buttonText}</button>
        )}
      </div>
    </SuccessModal>
  );
};

export default ResponseModal;
