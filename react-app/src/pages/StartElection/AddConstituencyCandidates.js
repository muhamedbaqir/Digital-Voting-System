import { useNavigate } from "react-router-dom";
import PrevNextButtonBar from "../../components/PrevNextButtonBar";

export default function AddConstituencyCandidates() {
  const navigate = useNavigate();

  return (
    <>
      AddConstituencyCandidates
      <div className="fixed-bottom">
        {" "}
        {PrevNextButtonBar(
          () => {
            navigate("/admin/AddConstituencyParties");
          },
          () => {
            navigate("/admin/AddFederalParties");
          },
          "Previous",
          "Next"
        )}
      </div>
    </>
  );
}
