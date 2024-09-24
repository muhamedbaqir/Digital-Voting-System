import { useNavigate } from "react-router-dom";
import PrevNextButtonBar from "../../components/PrevNextButtonBar";

export default function AddFederalParties() {
  const navigate = useNavigate();
  return (
    <>
      AddFederalParties{" "}
      <div className="fixed-bottom">
        {" "}
        {PrevNextButtonBar(
          () => {
            navigate("/admin/AddConstituencyCandidates");
          },
          () => {
            navigate("/admin/ConfirmElectionStart");
          },
          "Previous",
          "Next"
        )}
      </div>
    </>
  );
}
