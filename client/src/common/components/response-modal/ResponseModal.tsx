import { SuccessModal } from './ResponseModalStyle';
import { Link, To } from 'react-router-dom';

interface ResponseModalProps {
  to: To;
  content: string;
  buttonText: string;
}

const ResponseModal: React.FC<ResponseModalProps> = ({
  to,
  content,
  buttonText,
}) => {
  return (
    <SuccessModal>
      <div>
        <span>{content}</span>
        <Link to={to}>
          <button>{buttonText}</button>
        </Link>
      </div>
    </SuccessModal>
  );
};

export default ResponseModal;
