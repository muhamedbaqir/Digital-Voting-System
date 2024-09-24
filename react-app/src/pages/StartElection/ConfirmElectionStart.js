import { useNavigate } from "react-router-dom";
import PrevNextButtonBar from "../../components/PrevNextButtonBar";

export default function ConfirmElectionStart() {
  const navigate = useNavigate();

  return (
    <>
      ConfirmElectionStart
      <div className="fixed-bottom">
        {" "}
        {PrevNextButtonBar(
          () => {
            navigate("/admin/AddFederalParties");
          },
          () => {
            navigate("/admin/dashboard");
          },
          "Previous",
          "Next"
        )}
      </div>
    </>
  );
}
