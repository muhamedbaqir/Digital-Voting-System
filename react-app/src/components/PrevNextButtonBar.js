export default function PrevNextButtonBar(
  prevOnClick,
  nextOnClick,
  prevText,
  nextText
) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-1">
          <button
            className="btn btn-primary btn-lg m-3"
            type="submit"
            onClick={prevOnClick}
          >
            {prevText}
          </button>
        </div>
        <div className="col-10" />
        <div className="col-1">
          <button
            className="btn btn-primary btn-lg m-3"
            type="submit"
            onClick={nextOnClick}
          >
            {nextText}
          </button>
        </div>
      </div>
    </div>
  );
}
