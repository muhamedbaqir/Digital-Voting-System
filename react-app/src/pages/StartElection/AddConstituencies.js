import { useNavigate } from "react-router-dom";
import PrevNextButtonBar from "../../components/PrevNextButtonBar";

export default function AddConstituencies() {
  const navigate = useNavigate();

  return (
    <>
      AddConstituencies
      <div className="fixed-bottom">
        {PrevNextButtonBar(
          () => {
            navigate("/admin/dashboard");
          },
          () => {
            navigate("/admin/AddConstituencyParties");
          },
          "Abort",
          "Next"
        )}
      </div>
    </>
  );
}
