import { useNavigate } from "react-router-dom";
import PrevNextButtonBar from "../../components/PrevNextButtonBar";

export default function AddConstituencyParties() {
  const navigate = useNavigate();

  return (
    <>
      AddConstituencyParties
      <div className="fixed-bottom">
        {PrevNextButtonBar(
          () => {
            navigate("/admin/AddConstituencies");
          },
          () => {
            navigate("/admin/AddConstituencyCandidates");
          },
          "Previous",
          "Next"
        )}
      </div>
    </>
  );
}
